import React, { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveMealAsync } from '../../../actions';
import { useServerRequest } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';
import {
	mealTypes,
	dietCategories,
	goals,
	ingredients as allIngredients,
} from '../../../bff/constants';

export const MealEdit = ({
	meal: {
		id,
		title,
		imageUrl,
		type,
		calories,
		dietCategory,
		price,
		ingredients,
		goal,
	},
	isCreating,
}) => {
	const titleRef = useRef(null);
	const imageUrlRef = useRef(null);
	const typeRef = useRef(null);
	const caloriesRef = useRef(null);
	const dietCategoryRef = useRef(null);
	const priceRef = useRef(null);
	const goalRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const [editedData, setEditedData] = useState({
		id,
		title,
		imageUrl,
		type,
		calories,
		goal,
		dietCategory,
		price,
		ingredients,
	});

	const [filteredIngredients, setFilteredIngredients] =
		useState(allIngredients);
	const [selectedIngredients, setSelectedIngredients] = useState(
		editedData.ingredients || [],
	);

	const debouncedFilterIngredients = useCallback(
		debounce(inputValue => {
			const filtered = allIngredients.filter(ingredient =>
				ingredient.name
					.toLowerCase()
					.includes(inputValue.toLowerCase()),
			);
			setFilteredIngredients(filtered);
		}, 300),
		[],
	);

	useLayoutEffect(() => {
		if (isCreating) {
			setEditedData({
				id: null,
				title: '',
				imageUrl: '',
				type: '',
				calories: 0,
				goal: '',
				dietCategory: '',
				price: 0,
				ingredients: [],
			});
			setSelectedIngredients([]);
		} else {
			setEditedData({
				id,
				title,
				imageUrl,
				type,
				calories, 
				goal,
				dietCategory,
				price,
				ingredients,
			});
			setSelectedIngredients(ingredients || []);
		}
	}, [
		isCreating,
		id,
		title,
		imageUrl,
		type,
		calories,
		goal,
		dietCategory,
		price,
		ingredients,
	]);

	const handleSave = () => {
		dispatch(saveMealAsync(requestServer, editedData)).then(({ id }) =>
			navigate(`/meal/${id}`),
		);
	};

	const handleInputChange = e => {
		const { name, value, type } = e.target;

		setEditedData(prevData => ({
			...prevData,
			[name]: type === 'number' ? +value : value,
		}));
	};

	const handleIngredientChange = id => {
		setEditedData(prevData => {
			const currentIngredients = prevData.ingredients || [];
			const updatedIngredients = currentIngredients.includes(id)
				? currentIngredients.filter(ingredientId => ingredientId !== id)
				: [...currentIngredients, id];

			return {
				...prevData,
				ingredients: updatedIngredients,
			};
		});

		setSelectedIngredients(prevSelected => {
			const isSelected = prevSelected.includes(id);

			if (isSelected) {
				return prevSelected.filter(ingredientId => ingredientId !== id);
			} else {
				return [...prevSelected, id];
			}
		});
	};

	const filterIngredients = inputValue => {
		debouncedFilterIngredients(inputValue);
	};

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="flex-shrink-0">
				<img
					src={editedData.imageUrl}
					alt={editedData.title}
					className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
				/>
				<label className="mt-2 block text-sm font-medium text-gray-700">
					Ссылка на фото:
					<input
						ref={imageUrlRef}
						type="text"
						name="imageUrl"
						value={editedData.imageUrl}
						placeholder="Изображение..."
						onChange={handleInputChange}
						className="mt-1 w-full rounded-md border p-2"
					/>
				</label>
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

				<h2 className="mt-2 max-w-72 text-3xl font-semibold">
					<input
						ref={titleRef}
						type="text"
						name="title"
						value={editedData.title}
						placeholder="Название..."
						onChange={handleInputChange}
					/>
				</h2>

				<div className="mb-2 flex items-center text-gray-500">
					<div className="mr-2 text-base text-emerald-700">
						<select
							ref={typeRef}
							name="type"
							onChange={handleInputChange}
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
						>
							<option value="">Выберите тип приема пищи</option>
							{mealTypes.map(item => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<span className="mr-2">
						<input
							ref={caloriesRef}
							type="number"
							name="calories"
							value={editedData.calories}
							placeholder="Каллории..."
							onChange={handleInputChange}
						/>{' '}
						ккал.
					</span>
				</div>

				<div className="mb-2 flex items-center text-red-900">
					<span className="mr-2">
						<select
							ref={dietCategoryRef}
							name="dietCategory"
							onChange={handleInputChange}
							className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
						>
							<option value="">Выберите категорию диеты</option>
							{dietCategories.map(item => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</span>
				</div>

				<div className="mb-2 text-3xl font-bold text-gray-900">
					<input
						ref={priceRef}
						type="number"
						name="price"
						value={editedData.price}
						placeholder="Цена..."
						onChange={handleInputChange}
					/>
					₽
				</div>

				<div className="mb-2 mt-8 items-center text-lg">
					<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
						Ингредиенты:
					</span>
					<input
						type="text"
						placeholder="Поиск ингредиентов..."
						className="mt-1 w-full rounded-md border p-2"
						onChange={e => filterIngredients(e.target.value)}
					/>
					<div
						className={`mt-1 h-40 w-full overflow-y-auto rounded-md border bg-white shadow-lg ${
							filteredIngredients.length > 0
								? 'visible'
								: 'hidden'
						}`}
					>
						{filteredIngredients.map(item => (
							<div key={item.id} className="mt-2 ">
								<label className="cursor-pointer text-center hover:bg-emerald-100">
									<input
										className="mx-2 cursor-pointer items-center "
										type="checkbox"
										value={item.id}
										name="mealIngredients"
										checked={selectedIngredients.includes(
											item.id,
										)}
										onChange={() =>
											handleIngredientChange(item.id)
										}
									/>
									{item.name}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="mb-2 mt-8 items-center text-lg">
					<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
						Выбранные ингредиенты:
					</span>
					<ul className="mr-2 flex items-center text-lg">
						{selectedIngredients.map((id, index) => (
							<li key={id} className="mr-2">
								{
									allIngredients.find(item => item.id === id)
										?.name
								}
								{index !==
									(editedData.ingredients || []).length - 1 &&
									','}
							</li>
						))}
					</ul>
				</div>

				<div className="mb-2 flex items-center text-lg">
					<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
						Цель:
					</span>
					<select
						ref={goalRef}
						name="goal"
						onChange={handleInputChange}
						className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
					>
						<option value="" disabled={!editedData.goal}>
							{editedData.goal
								? editedData.goal
								: 'Выберите цель'}
						</option>
						{goals.map(item => (
							<option key={item.id} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};
