export const getMealTitle = ({ meals, mealId }) => {
	const selectedMeal = meals.find(meal => meal.id === mealId);
	return selectedMeal ? selectedMeal.title : 'Название не найдено';
};
