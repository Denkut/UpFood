import { getMeal } from '../api';
// import { getMealCommentsWithAuthor } from '../utils';

export const fetchMeal = async mealId => {
	const meal = await getMeal(mealId);
	// let meal;
	// let error;

	// try {
	// 	meal = await getMeal(mealId);
	// } catch (mealError) {
	// 	error = mealError;
	// }

	// if (error) {
	// 	return {
	// 		error,
	// 		res: null,
	// 	};
	// }

	// const commentsWithAuthor = await getMealCommentsWithAuthor();

	return {
		error: null,
		res: meal,
	};
};
