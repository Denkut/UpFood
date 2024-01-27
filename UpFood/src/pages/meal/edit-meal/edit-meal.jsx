import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectMealById } from '../../../selectors';
import { cancelEditingMealAsync, updateMealAsync } from '../../../actions';

export const EditMeal = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const meal = useSelector(state => selectMealById(state, id));

	const [editedData, setEditedData] = useState({
		title: meal?.title || '',
		imageUrl: meal?.imageUrl || '',
		type: meal?.type || '',
		calories: meal?.calories || '',
		dietCategories: Array.isArray(meal?.dietCategories)
			? meal?.dietCategories.join(', ')
			: '',

		price: meal?.price || '',
	});
	const [imageFile, setImageFile] = useState(null);

	const handleSave = async () => {
		const formData = new FormData();
		formData.append('title', editedData.title);
		formData.append('imageUrl', editedData.imageUrl);
		// Добавь другие поля в FormData по аналогии

		if (imageFile) {
			formData.append('image', imageFile);
		}

		dispatch(updateMealAsync(id, formData));
		dispatch(cancelEditingMealAsync());
	};

	const handleCancelEdit = () => {
		dispatch(cancelEditingMealAsync());
	};

	const handleInputChange = e => {
		const { name, value, type } = e.target;

		if (type === 'file') {
			const file = e.target.files[0];
			setImageFile(file);
		} else {
			setEditedData(prevData => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	return (
		<div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
			<div className="flex-shrink-0">
				<form>
					<label className="mt-4 block">
						<span className="text-gray-700">Image:</span>
						<input
							type="file"
							name="image"
							accept="image/*"
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Title:</span>
						<input
							type="text"
							name="title"
							value={editedData.title}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Image URL:</span>
						<input
							type="text"
							name="imageUrl"
							value={editedData.imageUrl}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Type:</span>
						<input
							type="text"
							name="type"
							value={editedData.type}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Calories:</span>
						<input
							type="text"
							name="calories"
							value={editedData.calories}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Diet Categories:</span>
						<input
							type="text"
							name="dietCategories"
							value={editedData.dietCategories}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<label className="mt-4 block">
						<span className="text-gray-700">Price:</span>
						<input
							type="text"
							name="price"
							value={editedData.price}
							onChange={handleInputChange}
							className="mt-1 w-full rounded-md border p-2"
						/>
					</label>
					<div className="mb-2 flex items-center text-gray-500">
						<div className="mr-2 text-base text-emerald-700">
							{editedData.type}
						</div>
						<span className="mr-2">
							{editedData.calories} ккал.
						</span>
					</div>
					<div className="mb-2 flex items-center text-red-900">
						<div className="mr-2">
							{Array.isArray(editedData.dietCategories)
								? editedData.dietCategories
										.map(category => category.trim())
										.join(', ')
								: editedData.dietCategories}
						</div>
					</div>
					<div className="mb-2 text-3xl font-bold text-gray-900">
						{editedData.price} ₽
					</div>
					<div className="ml-8 flex flex-col">
						<button
							type="button"
							className="focus:shadow-outline-blue rounded-md bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900 focus:outline-none active:bg-emerald-800"
							onClick={handleSave}
						>
							Save
						</button>
						<button
							type="button"
							className="focus:shadow-outline-blue mt-2 rounded-md bg-red-800 px-4 py-2 font-semibold text-white hover:bg-red-900 focus:outline-none active:bg-red-800"
							onClick={handleCancelEdit}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
