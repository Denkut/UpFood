export const transformRation = dbRation => {
	const transformedRation = {
		id: dbRation.id,
		title: dbRation.title,
		imageUrl: dbRation.image_url,
		totalCalories: dbRation.total_calories,
		goal: dbRation.goal,
		meals: dbRation.meals.map(meal => ({
			type: meal.type,
			items: meal.items.map(item => ({
				mealId: item.mealId,
				quantity: item.quantity || 1,
			})),
		})),
		price: dbRation.price,
		content: dbRation.content,
	};

	return transformedRation;
};
