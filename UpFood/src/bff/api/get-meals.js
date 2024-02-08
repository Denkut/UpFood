import { transformMeal } from '../transformers';

export const getMeals = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3005/meals?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then(loadedMeals =>
			Promise.all([loadedMeals.json(), loadedMeals.headers.get('Link')]),
		)
		.then(([loadedMeals, links]) => ({
			meals: loadedMeals && loadedMeals.map(transformMeal),
			links,
		}))
		.catch(error => console.log('Ошибка получения meals, links', error));
