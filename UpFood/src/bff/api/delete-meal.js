export const deleteMeal = async mealId =>
	fetch(`http://localhost:3005/meals/${mealId}`, {
		method: 'DELETE',
	}).catch(error => console.log('Ошибка удаления блюда ', error));
