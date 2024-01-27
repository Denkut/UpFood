import { transformMeal } from '../transformers';

export const getMeal = async mealId =>
	fetch(`http://localhost:3005/meals/${mealId}`)
		// .then(res => {
		// 	if (res.ok) {
		// 		return res;
		// 	}

		// 	const error =
		// 		res.status === 404
		// 			? 'Такая страница не существует'
		// 			: 'Что-то пошло не так. Попробуйте еще раз позднее.';

		// 	return Promise.reject(error);
		// })
		.then(loadedMeal => loadedMeal.json())
		.then(loadedMeal => loadedMeal && transformMeal(loadedMeal));
