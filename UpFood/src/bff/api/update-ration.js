export const updateRation = ({
	id,
	title,
	totalCalories,
	goal,
	meals,
	totalPrices,
	image_url,
	content,
}) => {
	const formattedMeals = meals.map(meal => ({
		items: meal.items.map(item => ({
			mealId: item.mealId,
			quantity: item.quantity,
			type: item.type,
			title: item.title,
			calories: item.calories,
			price: item.price,
		})),
	}));

	return fetch(`http://localhost:3005/rations/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id,
			title,
			total_calories: totalCalories,
			goal,
			meals: formattedMeals,
			total_prices: totalPrices,
			image_url,
			content,
		}),
	})
		.then(response => response.json())
		.catch(error => {
			console.error('Ошибка обновления ration', error);
			throw error;
		});
};
