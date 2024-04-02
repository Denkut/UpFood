import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveMealAsync } from '../../../actions';
import { useServerRequest } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
	ImageInput,
	IngredientList,
	IngredientSearch,
	NumberInput,
	SelectInput,
	SelectInputGoal,
	TextInput,
} from '../components/components';
import {
	mealTypes,
	dietCategories,
	goals,
	ingredients as allIngredients,
} from '../../../bff/constants';
import { PROP_TYPE } from '../../../constants';

export const MealEdit = ({
	meal: {
		id,
		title,
		imageUrl,
		type,
		calories,
		dietCategory,
		price,
		ingredients: initialIngredients,
		goal,
	},
	isCreating,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const [editedData, setEditedData] = useState({
		id,
		title,
		imageUrl,
		type,
		calories,
		dietCategory,
		price,
		goal,
		ingredients: initialIngredients || [],
	});

	useEffect(() => {
		if (isCreating) {
			setEditedData({
				id: null,
				title: '',
				imageUrl: '',
				type: '',
				calories: 0,
				dietCategory: '',
				price: 0,
				goal: '',
				ingredients: [],
			});
		}
	}, [isCreating]);

	const handleSave = () => {
		dispatch(saveMealAsync(requestServer, editedData)).then(({ id }) =>
			navigate(`/meal/${id}`),
		);
	};

	const handleInputChange = (name, value) => {
		setEditedData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleIngredientChange = id => {
		setEditedData(prevData => {
			const updatedIngredients = prevData.ingredients.includes(id)
				? prevData.ingredients.filter(
						ingredientId => ingredientId !== id,
					)
				: [...prevData.ingredients, id];

			return {
				...prevData,
				ingredients: updatedIngredients,
			};
		});
	};

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="flex-shrink-0">
				<ImageInput
					imageUrl={editedData.imageUrl}
					onImageUrlChange={value =>
						handleInputChange('imageUrl', value)
					}
				/>
			</div>

			<div className="ml-8 flex flex-col">
				<div className="flex items-center">
					<XMarkIcon
						onClick={() => navigate(`/meal/${id}`)}
						className="h-6 w-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
					/>
					<button
						className="text-lg text-emerald-800 hover:text-emerald-900"
						onClick={handleSave}
					>
						Сохранить
					</button>
				</div>

				<TextInput
					label="Название:"
					value={editedData.title}
					onChange={value => handleInputChange('title', value)}
				/>

				<div className="mb-2 flex items-center text-gray-500">
					<SelectInput
						label="Тип приема пищи:"
						options={mealTypes}
						value={editedData.type}
						onChange={value => handleInputChange('type', value)}
					/>

					<NumberInput
						label="Калории:"
						value={editedData.calories}
						onChange={value => handleInputChange('calories', value)}
						suffix="ккал."
					/>
				</div>

				<div className="mb-2 flex items-center text-red-900">
					<SelectInput
						label="Категория диеты:"
						options={dietCategories}
						value={editedData.dietCategory}
						onChange={value =>
							handleInputChange('dietCategory', value)
						}
					/>
				</div>

				<TextInput
					label="Цена:"
					value={editedData.price}
					onChange={value => handleInputChange('price', value)}
					suffix="₽"
				/>

				<IngredientSearch
					allIngredients={allIngredients}
					selectedIngredients={editedData.ingredients}
					onIngredientChange={handleIngredientChange}
				/>

				<IngredientList
					selectedIngredients={editedData.ingredients}
					allIngredients={allIngredients}
				/>

				<SelectInputGoal
					label="Цель:"
					options={goals}
					value={editedData.goal}
					onChange={value => handleInputChange('goal', value)}
				/>
			</div>
		</div>
	);
};

MealEdit.propTypes = {
	meal: PROP_TYPE.MEAL,
};
