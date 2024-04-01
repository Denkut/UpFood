import { getMeal } from '../api';

export const fetchMeal = async mealId => {
	let meal;
	let error;

	try {
		meal = await getMeal(mealId);
	} catch (mealError) {
		error = mealError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	return {
		error: null,
		res: meal,
	};
};
