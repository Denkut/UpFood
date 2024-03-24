export const addRation = ({
	title,
	totalCalories,
	goal,
	meals,
	totalPrice,
	content,
	image_url,
	imageUrl,
	price,
	calories,
	type,
}) => {
	const formattedMeals = meals.map(mealType => ({
		items: mealType.items.map(item => ({
			type: item.type,
			mealId: item.mealId,
			quantity: item.quantity,
			title: item.title,
			calories: item.calories,
			price: item.price,
			ingredients: item.ingredients,
		})),
	}));

	return fetch('http://localhost:3005/rations', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			total_calories: totalCalories,
			goal,
			meals: formattedMeals,
			total_price: totalPrice,
			content,
			price,
			image_url,
			imageUrl,
			calories,
			type,
		}),
	})
		.then(createdRation => createdRation.json())
		.catch(error => console.log('Ошибка добавления ration', error));
};
