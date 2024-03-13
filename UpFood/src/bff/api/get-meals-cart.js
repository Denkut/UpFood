import { transformMeal } from '../transformers';

export const getMealsCart = () =>
	fetch(`http://localhost:3005/meals`)
		.then(loadedMeals => loadedMeals.json())
		.then(loadedMeals => ({
			meals: loadedMeals && loadedMeals.map(transformMeal),
		}))
		.catch(error => console.log('Ошибка получения meals, links', error));