export const transformRation = dbRation => ({
	id: dbRation.id,
	title: dbRation.title,
	imageUrl: dbRation.image_url,
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
	content: dbRation.content,
});
