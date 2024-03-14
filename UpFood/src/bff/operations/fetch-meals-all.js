import { getMealsAll } from '../api';

export const fetchMealsAll = async () => {
	const response = await getMealsAll();
	const meals = response.meals;

	return {
		error: null,
		res: {
			meals: meals.map(meal => ({
				...meal,
			})),
		},
	};
};
