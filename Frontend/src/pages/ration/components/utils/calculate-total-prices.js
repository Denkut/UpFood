export const calculateTotalPrices = ({ ration, meals }) => {
	if (!meals) return 0;

	const totalPrice = ration.meals.reduce((acc, mealType) => {
		mealType.items.forEach(item => {
			const selectedMeal = meals.find(meal => meal.id === item.mealId);
			if (selectedMeal) {
				acc += selectedMeal.price * item.quantity;
			}
		});
		return acc;
	}, 0);

	return totalPrice;
};
