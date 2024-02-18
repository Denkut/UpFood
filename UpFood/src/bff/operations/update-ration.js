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
			totalPrices: ration.total_prices,
			goal: ration.goal,
			meals: ration.meals.map(meal => ({
				items: meal.items.map(item => ({
					type: item.type,
					mealId: item.meal_id,
					price: item.price,
					calories: item.calories,
					quantity: item.quantity || 1,
				})),
			})),
			content: ration.content,
		},
	};
};
