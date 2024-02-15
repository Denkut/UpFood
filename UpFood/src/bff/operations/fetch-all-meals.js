import { getAllMeals } from '../api';

export const fetchAllMeals = async () => {
	const response = await getAllMeals();
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
