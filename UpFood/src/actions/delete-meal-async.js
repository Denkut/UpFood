import { setMealData } from './set-meal-data';

export const deleteMealAsync = mealId => async (dispatch, getState) => {
	try {
		// Получаем текущее состояние хранилища
		const currentState = getState();

		// Здесь вы можете использовать currentState, если вам нужны данные из хранилища
		console.log('Current state:', currentState);
		// Здесь вам нужно реализовать логику для удаления данных на сервере
		// Пример вызова API
		const response = await fetch(`http://localhost:3005/meals/${mealId}`, {
			method: 'DELETE',
		});

		// Проверка успешности запроса
		if (!response.ok) {
			throw new Error(
				`Failed to delete meal. Status: ${response.status}`,
			);
		}

		// Если удаление прошло успешно, обновляем данные в хранилище
		dispatch(setMealData(null)); // Установите значение на null или другое значение по умолчанию
	} catch (error) {
		// Обработка ошибок, если необходимо
		console.error('Error deleting meal:', error);
	}
};
