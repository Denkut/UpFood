import { getMeals } from '../api';

export const fetchMeals = async searchPhrase => {
	const pizzas = await getMeals(searchPhrase);

	return {
		error: null,
		res: pizzas,
	};
};
