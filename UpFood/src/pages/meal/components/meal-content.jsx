/* eslint-disable no-unused-vars */
import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectMealEditing } from '../../../selectors';
import { useNavigate } from 'react-router-dom';
import {
	cancelEditingMealAsync,
	deleteMealAsync,
	startEditingMealAsync,
	updateMealAsync,
} from '../../../actions';
import { useState } from 'react';

export const MealContent = ({
	meal = {
		id: '',
		title: '',
		imageUrl: '',
		type: '',
		calories: 0,
		dietCategories: [],
		price: 0,
	},
}) => {
	const dispatch = useDispatch();
	const isEditing = useSelector(selectMealEditing);
	const navigate = useNavigate();
	const [editedData, setEditedData] = useState({
		title: meal.title,
		imageUrl: meal.imageUrl,
		type: meal.type,
		calories: meal.calories,
		dietCategories: Array.isArray(meal.dietCategories)
		? meal.dietCategories.join(', ')
		: '',
		price: meal.price,
	});
	console.log("meal:", meal);

	const handleEdit = () => {
		dispatch(startEditingMealAsync());
		navigate(`/meal/${meal.id}/edit`);
	};

	const handleSave = () => {
		console.log("editedData:", editedData);
		dispatch(updateMealAsync(meal.id, editedData));
		dispatch(cancelEditingMealAsync());
	};

	const handleCancelEdit = () => {
		dispatch(cancelEditingMealAsync());
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setEditedData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleGoBack = () => {
		navigate.goBack();
	};

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="flex-shrink-0">
				<img
					src={meal.imageUrl}
					alt={meal.title}
					className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
				/>
			</div>
			<div className="ml-8 flex flex-col">
				<div className="flex">
					{isEditing ? (
						<>
							<XMarkIcon
								onClick={handleCancelEdit}
								className="h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
							/>
							<button onClick={handleSave}>Сохранить</button>
						</>
					) : (
						<>
							<PencilSquareIcon
								onClick={handleEdit}
								className="block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-emerald-900"
							/>
							<TrashIcon
								onClick={() =>
									dispatch(deleteMealAsync(meal.id))
								}
								className="ml-2 block h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-red-800"
							/>
							<XMarkIcon
								onClick={handleGoBack}
								className="ml-64 h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
							/>
						</>
					)}
				</div>

				<h2 className="mt-2 max-w-72  text-3xl font-semibold">
					{meal.title}
				</h2>
				<div className="mb-2 flex items-center text-gray-500">
					<div className="mr-2 text-base  text-emerald-700">
						{meal.type}
					</div>
					<span className="mr-2">{meal.calories} ккал.</span>
				</div>

				<div className="mb-2 flex items-center text-red-900">
					{Array.isArray(meal.dietCategories) &&
						meal.dietCategories.length > 0 && (
							<span className="mr-2">
								{meal.dietCategories
									.map(category => category.trim())
									.join(', ')}
							</span>
						)}
				</div>
				<div className="mb-2 text-3xl font-bold text-gray-900">
					{meal.price} ₽
				</div>
				<button className="focus:shadow-outline-blue h-[65px]  w-[156px] items-center rounded-3xl bg-emerald-800 px-4 py-2 text-xl font-bold text-emerald-50 hover:bg-emerald-900 focus:outline-none active:bg-emerald-800">
					Добавить
				</button>
			</div>
		</div>
	);
};
