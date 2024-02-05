import { transformMeal } from '../transformers';

export const getMeal = async mealId =>
	fetch(`http://localhost:3005/meals/${mealId}`)
		.then(loadedMeal => loadedMeal.json())
		.then(loadedMeal => loadedMeal && transformMeal(loadedMeal));
