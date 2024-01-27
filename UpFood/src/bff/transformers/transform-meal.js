export const transformMeal = dbMeal => ({
	id: dbMeal.id,
	title: dbMeal.title,
	imageUrl: dbMeal.image_url,
	type: dbMeal.type,
	calories: dbMeal.calories,
	suitableFor: dbMeal.suitableFor,
	dietCategories: dbMeal.dietCategories,
	price: dbMeal.price,
	ingredients: dbMeal.ingredients,
});
