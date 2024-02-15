import React from 'react';
import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors';
import { Link, useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal, removeMealAsync } from '../../../actions';
import { checkAccess } from '../../../utils';
import { ROLE } from '../../../bff/constants';
import { Modal } from '../../../components';
import { useServerRequest } from '../../../hooks';

export const RationContent = ({ ration, meals }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onMealRemove = mealId => {
		dispatch(
			openModal({
				text: 'Удалить блюдо?',
				onConfirm: () => {
					dispatch(removeMealAsync(requestServer, mealId)).then(
						() => {
							navigate('/');
						},
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const calculateTotalPrice = () => {
		if (!meals) return 0;

		const totalPrice = ration.meals.reduce((acc, mealType) => {
			mealType.items.forEach(item => {
				const selectedMeal = meals.find(
					meal => meal.id === item.mealId,
				);
				if (selectedMeal) {
					acc += selectedMeal.price * item.quantity;
				}
			});
			return acc;
		}, 0);

		return totalPrice;
	};

	const getMealTitle = mealId => {
		const selectedMeal = meals.find(meal => meal.id === mealId);
		return selectedMeal ? selectedMeal.title : 'Название не найдено';
	};

	const getMealImage = mealId => {
		const selectedMeal = meals.find(meal => meal.id === mealId);
		return selectedMeal
			? selectedMeal.imageUrl
			: 'https://placehold.it/100x100';
	};

	const calculateTotalCalories = () => {
		if (!meals) return 0;

		let totalCalories = 0;

		ration.meals.forEach(mealType => {
			mealType.items.forEach(item => {
				const selectedMeal = meals.find(
					meal => meal.id === item.mealId,
				);
				if (selectedMeal) {
					totalCalories += selectedMeal.calories * item.quantity;
				}
			});
		});

		return totalCalories;
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="ml-8 flex flex-col">
				<div className="flex">
					{isAdmin && (
						<>
							<PencilSquareIcon
								onClick={() =>
									navigate(`/ration/${ration.id}/edit`)
								}
								className="block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-emerald-900"
							/>
							<>
								<TrashIcon
									onClick={() => onMealRemove(ration.id)}
									className="ml-2 block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-red-800"
								/>
								<XMarkIcon
									onClick={() => navigate('/')}
									className="ml-64 h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
								/>
							</>
						</>
					)}
				</div>

				<h2 className="mt-2 max-w-72  text-3xl font-semibold">
					{ration.title}
				</h2>
				<div className="mb-2 flex items-center text-gray-500">
					<div className="mr-2 text-base  text-emerald-700">
						{ration.goal}
					</div>
					<span className="mr-2">
						{calculateTotalCalories()} ккал.
					</span>
				</div>

				<div className="flex flex-wrap">
					{ration.meals.map((mealType, id) => (
						<div key={id} className="mb-4">
							<div className="mx-auto flex h-full w-96 transform flex-col overflow-hidden rounded-xl shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
								{mealType.items.map((item, itemId) => (
									<Link
										key={itemId}
										className="flex h-full flex-col"
										to={`/meal/${item.mealId}`}
									>
										<h3 className="mb-2 text-xl font-bold">
											{mealType.type}
										</h3>
										<img
											src={getMealImage(item.mealId)}
											alt={getMealTitle(item.mealId)}
											className="h-48 w-full object-cover object-center p-4"
										/>
										<p className="text-center">
											{getMealTitle(item.mealId)}
										</p>
										<p className="text-center">
											Количество: {item.quantity}
										</p>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="m-4 text-3xl font-bold text-gray-900">
					{calculateTotalPrice()} ₽
				</div>
				<button className="focus:shadow-outline-blue h-[65px]  w-[156px] items-center rounded-3xl bg-emerald-800 px-4 py-2 text-xl font-bold text-emerald-50 hover:bg-emerald-900 focus:outline-none active:bg-emerald-800">
					Добавить
				</button>
			</div>
			<Modal />
		</div>
	);
};
