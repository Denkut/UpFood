import { getMeals } from '../api';

export const fetchMeals = async (searchPhrase, page, limit) => {
	const response = await getMeals(searchPhrase, page, limit);
	const meals = response.meals;

	return {
		error: null,
		res: {
			meals: meals.map(meal => ({
				...meal,
			})),
			links: response.links,
		},
	};
};
