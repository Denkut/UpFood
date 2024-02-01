import { setMealsData } from './set-meals-data';

export const loadMealsAsync = requestServer => dispatch =>
	requestServer('fetchMeals').then(mealsData => {
		if (mealsData.res) {
			dispatch(setMealsData(mealsData.res));
		}
		return mealsData;
	});
