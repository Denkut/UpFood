// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';

// import { selectMealById } from '../../selectors';
// import { cancelEditingMealAsync } from '../../actions';

// export const AddMeal = () => {
// 	const { id } = useParams();
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const meal = useSelector(state => selectMealById(state, id));

// 	const [editedData, setEditedData] = useState({
// 		title: meal?.title || '',
// 		imageUrl: meal?.imageUrl || '',
// 		type: meal?.type || '',
// 		calories: meal?.calories || '',
// 		dietCategories: Array.isArray(meal?.dietCategories)
// 			? meal?.dietCategories.join(', ')
// 			: '',
// 		goal: Array.isArray(meal?.goal)
// 			? meal?.goal.join(', ')
// 			: '',
// 		ingredients: Array.isArray(meal?.ingredients)
// 			? meal?.ingredients.join(', ')
// 			: '',
// 		price: meal?.price || '',
// 	});
// 	const [imageFile, setImageFile] = useState(null);

// 	const handleSave = async () => {
// 		const formData = new FormData();
// 		formData.append('title', editedData.title);

// 		if (imageFile) {
// 			formData.append('image', imageFile);
// 		} else {
// 			formData.append('imageUrl', editedData.imageUrl);
// 		}

// 		formData.append('type', editedData.type);
// 		formData.append('colories', editedData.calories);
// 		formData.append('dietCategories', editedData.dietCategories);
// 		formData.append('goal', editedData.goal);
// 		formData.append('ingredients', editedData.ingredients);
// 		formData.append('price', editedData.price);

// 		dispatch(updateMealAsync(id, formData));
// 		dispatch(cancelEditingMealAsync());

// 		navigate.push('/meal');
// 	};

// 	const handleCancelEdit = () => {
// 		dispatch(cancelEditingMealAsync());
// 	};

// 	const handleInputChange = e => {
// 		const { name, value, type } = e.target;

// 		if (type === 'file') {
// 			const file = e.target.files[0];
// 			setImageFile(file);
// 			setEditedData(prevData => ({
// 				...prevData,
// 				image: file, // Устанавливаем значение image как файл
// 			}));
// 		} else {
// 			setEditedData(prevData => ({
// 				...prevData,
// 				[name]: value,
// 			}));
// 		}
// 	};

// 	return (
// 		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
// 			<div className="flex-shrink-0">
// 				<form>
// 					<label className="block">
// 						<span className="text-gray-700">Фото:</span>
// 						<input
// 							type="file"
// 							name="image"
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>

// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Название блюда:</span>
// 						<input
// 							type="text"
// 							name="title"
// 							value={editedData.title}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Тип:</span>
// 						<input
// 							type="text"
// 							name="type"
// 							value={editedData.type}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Каллорий:</span>
// 						<input
// 							type="text"
// 							name="calories"
// 							value={editedData.calories}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Категория диеты:</span>
// 						<input
// 							type="text"
// 							name="dietCategories"
// 							value={editedData.dietCategories}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Цель:</span>
// 						<input
// 							type="text"
// 							name="goal"
// 							value={editedData.goal}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mt-4 block">
// 						<span className="text-gray-700">Ингредиенты:</span>
// 						<input
// 							type="text"
// 							name="ingredients"
// 							value={editedData.ingredients}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>
// 					<label className="mb-5 mt-4 block">
// 						<span className="text-gray-700">Цена:</span>
// 						<input
// 							type="text"
// 							name="price"
// 							value={editedData.price}
// 							onChange={handleInputChange}
// 							className="mt-1 w-full rounded-md border p-2"
// 						/>
// 					</label>

// 					<div className="ml-8 flex flex-col">
// 						<button
// 							type="button"
// 							className="focus:shadow-outline-blue rounded-md bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900 focus:outline-none active:bg-emerald-800"
// 							onClick={handleSave}
// 						>
// 							Сохранить
// 						</button>
// 						<button
// 							type="button"
// 							className="focus:shadow-outline-blue mt-2 rounded-md bg-red-800 px-4 py-2 font-semibold text-white hover:bg-red-900 focus:outline-none active:bg-red-800"
// 							onClick={handleCancelEdit}
// 						>
// 							Отменить
// 						</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
