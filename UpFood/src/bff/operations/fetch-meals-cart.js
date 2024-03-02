import { getMealsCart } from '../api';

export const fetchMealsCart = async () => {
	const response = await getMealsCart();
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
