import { setMealData } from './set-meal-data';

export const updateMealAsync =
	(mealId, editedData) => async (dispatch, getState) => {
		try {
			const currentState = getState();
			console.log('Current state:', currentState);

			const formData = new FormData();

			// Добавляем данные из editedData в formData
			Object.entries(editedData).forEach(([key, value]) => {
				formData.append(key, value);
			});

			// Если есть изображение в editedData, добавляем его в formData
			if (editedData.image) {
				formData.append('image', editedData.image);
			}

			const response = await fetch(
				`http://localhost:3005/meals/${mealId}`,
				{
					method: 'PUT',
					body: formData,
				},
			);

			if (!response.ok) {
				throw new Error(
					`Failed to update meal. Status: ${response.status}`,
				);
			}

			const updatedMeal = await response.json();
			dispatch(setMealData(updatedMeal));
		} catch (error) {
			console.error('Error updating meal:', error);
		}
	};
