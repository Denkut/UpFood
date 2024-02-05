import { getMeal } from '../api';

export const fetchMeal = async mealId => {
	const meal = await getMeal(mealId);

	return {
		error: null,
		res: meal,
	};
};
