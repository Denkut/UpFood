export const filterAllergenicMeals = (meals, userAllergies) => {
	const markedMeals = [];
	const unmarkedMeals = [];

	meals.forEach(meal => {
		if (meal.ingredients.some(id => userAllergies.includes(String(id)))) {
			markedMeals.push(meal);
		} else {
			unmarkedMeals.push(meal);
		}
	});

	return { unmarkedMeals, markedMeals };
};
