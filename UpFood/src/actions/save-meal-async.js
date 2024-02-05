import { setMealData } from './set-meal-data';

export const saveMealAsync = (requestServer, newMealData) => dispatch =>
	requestServer('saveMeal', newMealData).then(updatedMeal => {
		dispatch(setMealData(updatedMeal.res));

		return updatedMeal.res;
	});
