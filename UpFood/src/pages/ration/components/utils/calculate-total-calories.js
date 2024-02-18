export const calculatetotalCalories = ({ ration, meals }) => {
	if (!meals) return 0;

	let totalCalories = 0;

	ration.meals.forEach(mealType => {
		mealType.items.forEach(item => {
			const selectedMeal = meals.find(meal => meal.id === item.mealId);
			if (selectedMeal) {
				totalCalories += selectedMeal.calories * item.quantity;
			}
		});
	});

	return totalCalories;
};
