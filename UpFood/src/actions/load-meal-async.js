import { setMealData } from './set-meal-data';
export const loadMealAsync = (requestServer, mealId) => dispatch =>
	requestServer('fetchMeal', mealId).then(mealData => {
		if (mealData.res) {
			dispatch(setMealData(mealData.res));
		}
		return mealData;
	});
