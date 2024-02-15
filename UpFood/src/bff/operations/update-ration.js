import { setRation } from '../../actions';

export const updateRation = async (ration, rationEditData) => {
	await setRation(ration.id, rationEditData);

	return {
		error: null,
		res: {
			id: ration.id,
			title: ration.title,
			imageUrl: ration.image_url,
			totalCalories: ration.total_calories,
			goal: ration.goal,
			meals: ration.meals.map(meal => ({
				type: meal.type,
				items: meal.items.map(item => ({
					mealId: item.meal_id,
					priceId: item.price_id,
					quantity: item.quantity || 1,
				})),
			})),
			price: ration.price,
			content: ration.content,
		},
	};
};
