import { setMeal } from '../api';

export const updateMeal = async (meal, mealEditData) => {
	await setMeal(meal.id, mealEditData);

	return {
		error: null,
		res: {
			id: meal.id,
			title: meal.title,
			imageUrl: meal.imageUrl,
			type: meal.type,
			calories: meal.calories,
			dietCategory: meal.dietCategory,
			price: meal.price,
			ingredients: meal.ingredients,
			goal: meal.goal,
			...mealEditData,
		},
	};
};
