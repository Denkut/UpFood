import { transformMeal } from '../transformers';

export const getMeals = () =>
	fetch('http://localhost:3005/meals')
		.then(loadedMeals => loadedMeals.json())
		.then(loadedMeals => loadedMeals && loadedMeals.map(transformMeal));
