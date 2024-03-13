import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCart, updateCartItemQuantityAsync } from '../../actions';
import { useServerRequest } from '../../hooks';
import { selectCart, selectUser, selectUserSession } from '../../selectors';
import { server } from '../../bff';
import { MealItem, RationItem } from './сomponents';

export const Cart = () => {
	const dispatch = useDispatch();
	const userCart = useSelector(selectCart);
	const user = useSelector(selectUser);
	const session = useSelector(selectUserSession);
	const mealsCart = userCart.meals || [];
	const rationsCart = userCart.rations || [];
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
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
			if (user) {
				setIsLoading(true);
				try {
					const mealsResponse = await requestServer('fetchMealsCart');
					const rationsResponse =
						await requestServer('fetchRationsCart');
					const { meals } = mealsResponse.res || {};
					const { rations } = rationsResponse.res || {};

					const mealsToDisplay = meals.filter(meal =>
						mealsCart.some(item => item.id === meal.id),
					);

					setFilteredMeals(mealsToDisplay);

					const rationsToDisplay = rations.filter(ration =>
						rationsCart.some(item => item.id === ration.id),
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

					const mealsObj = meals.reduce((acc, meal) => {
						acc[meal.id] = meal;
						return acc;
					}, {});
					setMealsData(mealsObj);
				} catch (error) {
					setServerError(`Ошибка запроса: ${error.message}`);
				} finally {
					setIsLoading(false);
				}
			} else {
				dispatch(logout(session));
				sessionStorage.removeItem('userData');
			}
		};

		fetchMealsAndRations();
	}, [requestServer, user, mealsCart, rationsCart, dispatch]);

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

	const handleRemoveItem = async (itemId, type) => {
		setIsLoading(true);

		try {
			const { error, res } = await server.removeCartItem(
				itemId,
				type,
				user.id,
				userCart,
			);

			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setIsLoading(false);
				return;
			}

			const updatedCartItems = [...res.meals, ...res.rations];
			dispatch(setCart(res));

			const currentUserDataJSON = sessionStorage.getItem('userData');
			if (currentUserDataJSON) {
				const currentUserData = JSON.parse(currentUserDataJSON);
				currentUserData.cart = res;

				sessionStorage.setItem(
					'userData',
					JSON.stringify(currentUserData),
				);
			}

			setFilteredMeals(
				updatedCartItems.filter(item => item.type === 'meal'),
			);
			setFilteredRations(
				updatedCartItems
					.filter(item => item.type === 'ration')
					.map(ration => ({
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

			setIsLoading(false);
		} catch (error) {
			setServerError(`Ошибка запроса: ${error.message}`);
			setIsLoading(false);
		}
	};

	const handleUpdateQuantity = (id, newQuantity) => {
		dispatch(updateCartItemQuantityAsync({ id, count: newQuantity }));
	};

	return (
		<div className="container mx-auto mt-8">
			<h2 className="mb-4 text-3xl font-bold">Корзина</h2>
			{isLoading && <p>Загрузка...</p>}
			{serverError && <p>{serverError}</p>}

			{filteredMeals.length === 0 && filteredRations.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<div>
					{filteredMeals.map(item => (
						<MealItem
							key={item.id}
							item={item}
							handleUpdateQuantity={handleUpdateQuantity}
							handleRemoveItem={handleRemoveItem}
							isLoading={isLoading}
							mealsData={mealsData}
						/>
					))}
					{filteredRations.map(ration => (
						<RationItem
							key={ration.id}
							ration={ration}
							visibleMeals={visibleMeals}
							toggleVisibleMeals={toggleVisibleMeals}
							handleRemoveItem={handleRemoveItem}
							isLoading={isLoading}
							mealsData={mealsData}
						/>
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
