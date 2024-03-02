import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeItemFromCartAsync,
	setMeals,
	setRations,
	updateCartItemQuantityAsync,
} from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectCart } from '../../selectors';

export const Cart = () => {
	const dispatch = useDispatch();
	const userCart = useSelector(selectCart);
	const mealsCart = userCart.meals || [];
	const rationsCart = userCart.rations || [];
	const cartItems = [...mealsCart, ...rationsCart];
	const [totalPrice, setTotalPrice] = useState(0);
	const requestServer = useServerRequest();
	const [filteredMeals, setFilteredMeals] = useState([]);
	const [filteredRations, setFilteredRations] = useState([]);
	const [mealsData, setMealsData] = useState({});
	const [visibleMeals, setVisibleMeals] = useState({});

	const toggleVisibleMeals = rationId => {
		setVisibleMeals(prevVisibleMeals => ({
			...prevVisibleMeals,
			[rationId]: !prevVisibleMeals[rationId],
		}));
	};

	useEffect(() => {
		const fetchMealsAndRations = async () => {
			const mealsResponse = await requestServer('fetchMealsCart');
			const rationsResponse = await requestServer('fetchRationsCart');
			const { meals } = mealsResponse.res || {};
			const { rations } = rationsResponse.res || {};

			const mealsToDisplay = meals.filter(meal =>
				cartItems.some(item => item.id === meal.id),
			);
			setFilteredMeals(mealsToDisplay);
			dispatch(setMeals(mealsToDisplay));

			const rationsToDisplay = rations.filter(ration =>
				cartItems.some(item => item.id === ration.id),
			);
			setFilteredRations(
				rationsToDisplay.map(ration => ({
					...ration,
					totalPrice: ration.meals.reduce((total, meal) => {
						const mealPrice = meal.items.reduce(
							(subtotal, item) =>
								subtotal + item.price * item.quantity,
							0,
						);
						return total + mealPrice;
					}, 0),
				})),
			);
			dispatch(setRations(rationsToDisplay));

			const mealsObj = meals.reduce((acc, meal) => {
				acc[meal.id] = meal;
				return acc;
			}, {});
			setMealsData(mealsObj);
		};

		fetchMealsAndRations();
	}, [requestServer]);

	useEffect(() => {
		const newTotalPrice =
			filteredMeals.reduce(
				(total, item) => total + parseFloat(item.price),
				0,
			) +
			filteredRations.reduce(
				(total, ration) => total + ration.totalPrice,
				0,
			);
		setTotalPrice(newTotalPrice);
	}, [filteredMeals, filteredRations]);

	const handleRemoveItem = itemId => {
		dispatch(removeItemFromCartAsync(requestServer, itemId));
	};

	const handleRemoveRation = rationId => {
		dispatch(removeItemFromCartAsync(requestServer, rationId));
	};

	const handleUpdateQuantity = (id, newQuantity) => {
		dispatch(updateCartItemQuantityAsync({ id, count: newQuantity }));
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="mb-4 text-3xl font-bold">Корзина</h2>
			{filteredMeals.length === 0 && filteredRations.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<div>
					{filteredMeals.map(item => (
						<div key={item.id} className="mb-4 flex items-center">
							<img
								src={item.imageUrl}
								alt={item.title}
								className="mr-4 h-16 w-16 rounded object-cover"
							/>
							<div className="flex-1">
								<p className="text-lg font-bold">
									{item.title}
								</p>
							</div>
							<div className="flex items-center space-x-4">
								<p className="text-lg font-bold">
									{item.price} ₽
								</p>
								<div className="flex items-center">
									<button
										onClick={() =>
											handleUpdateQuantity(
												item.id,
												item.count - 1,
											)
										}
										disabled={item.count <= 1}
										className="text-gray-500 hover:text-emerald-500 focus:outline-none"
									>
										-
									</button>
									<span className="mx-2">{item.count}</span>
									<button
										onClick={() =>
											handleUpdateQuantity(
												item.id,
												item.count + 1,
											)
										}
										className="text-emerald-500 hover:text-emerald-700 focus:outline-none"
									>
										+
									</button>
								</div>
								<button
									onClick={() => handleRemoveItem(item.id)}
									className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
								>
									Удалить
								</button>
							</div>
						</div>
					))}
					{filteredRations.map(ration => (
						<div key={ration.id} className="mb-4  items-center">
							<div className="mb-4 flex items-center">
								<img
									onClick={() =>
										toggleVisibleMeals(ration.id)
									}
									src={ration.imageUrl}
									alt={ration.title}
									className="mr-4 h-24 w-24 cursor-pointer rounded object-cover"
								/>
								<div className="flex-1">
									<p
										onClick={() =>
											toggleVisibleMeals(ration.id)
										}
										className="cursor-pointer text-lg font-bold hover:text-emerald-700"
									>
										{ration.title}
									</p>
								</div>
								<div className="flex items-center space-x-4">
									<p className="text-lg font-bold">
										{ration.totalPrice} ₽
									</p>
									<button
										onClick={() =>
											handleRemoveRation(ration.id)
										}
										className=" text-red-500 hover:text-red-700 focus:outline-none"
									>
										Удалить рацион{' '}
									</button>
								</div>
							</div>
							{visibleMeals[ration.id] && (
								<div>
									{ration.meals.map((meal, index) => (
										<div
											key={index}
											className="mb-4 ml-4 flex items-center"
										>
											{meal.items.map(
												(mealItem, mealIndex) => (
													<img
														key={mealIndex}
														src={
															mealsData[
																mealItem.mealId
															].imageUrl
														}
														alt={`Meal ${
															mealIndex + 1
														}`}
														className="mr-4 h-16 w-16 rounded object-cover"
													/>
												),
											)}
											<div className="flex-1">
												<p className="text-lg font-bold">
													{meal.items[0].title}
												</p>
											</div>
											<div className="flex items-center space-x-4">
												<p className="text-lg font-bold">
													{meal.items[0].price} ₽
												</p>
											</div>
											<div className="m-2 flex items-center">
												<div className="flex items-center space-x-4">
													<button
														onClick={() =>
															handleUpdateQuantity(
																meal.items[0]
																	.mealId,
																meal.items[0]
																	.quantity -
																	1,
															)
														}
														disabled={
															meal.items[0]
																.quantity <= 1
														}
														className="text-gray-500 hover:text-emerald-500 focus:outline-none"
													>
														-
													</button>
													<span className="mx-2">
														{meal.items[0].quantity}
													</span>
													<button
														onClick={() =>
															handleUpdateQuantity(
																meal.items[0]
																	.mealId,
																meal.items[0]
																	.quantity +
																	1,
															)
														}
														className="text-emerald-500 hover:text-emerald-700 focus:outline-none"
													>
														+
													</button>
												</div>
												<button
													onClick={() =>
														handleRemoveItem(
															meal.items[0]
																.mealId,
														)
													}
													className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
												>
													Удалить
												</button>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					))}
					<div className="mt-4">
						<p className="text-xl font-semibold">
							Общая стоимость: {totalPrice} ₽
						</p>
						<button className="mt-4 rounded-md bg-emerald-800 px-4 py-2 text-white">
							Оформить заказ
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
