export const selectMealById = (state, mealId) => {
	return state.meals[mealId];
};
