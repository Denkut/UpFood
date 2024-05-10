export const getMealImage = ({ meals, mealId }) => {
	const selectedMeal = meals.find(meal => meal.id === mealId);
	return selectedMeal
		? selectedMeal.imageUrl
		: 'https://placehold.it/100x100';
};
