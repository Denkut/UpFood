import { setMeals } from './set-meals';

export const loadMealsAsync = requestServer => dispatch =>
	requestServer('fetchMeals').then(mealsData => {
		if (mealsData.res) {
			dispatch(setMeals(mealsData.res));
		}
		return mealsData;
	});
