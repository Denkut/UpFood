export const transformMeal = dbMeal => ({
	id: dbMeal.id,
	title: dbMeal.title,
	imageUrl: dbMeal.image_url,
	type: dbMeal.type,
	calories: dbMeal.calories,
	dietCategory: dbMeal.dietCategory,
	price: dbMeal.price,
	ingredients: dbMeal.ingredients,
	goal: dbMeal.goal,
});
