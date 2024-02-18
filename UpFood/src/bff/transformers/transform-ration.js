export const transformRation = dbRation => ({
	id: dbRation.id,
	title: dbRation.title,
	imageUrl: dbRation.image_url,
	totalCalories: dbRation.total_calories,
	goal: dbRation.goal,
	meals: dbRation.meals.map(mealType => ({
		items: mealType.items.map(item => ({
			mealId: item.mealId,
			title: item.title,
			type: item.type,
			price: item.price,
			calories: item.calories,
			quantity: item.quantity || 1,
		})),
	})),
	totalPrices: dbRation.total_prices,
	content: dbRation.content,
});
