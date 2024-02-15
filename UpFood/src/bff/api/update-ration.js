export const updateRation = ({
	id,
	title,
	total_calories,
	goal,
	meals,
	total_price,
	image_url,
	content,
}) => {
	const formattedMeals = meals.map(meal => ({
		...meal,
		items: meal.items.map(item => ({
			mealId: item.mealId,
			quantity: item.quantity,
		})),
	}));

	fetch(`http://localhost:3005/rations/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			total_calories,
			goal,
			meals: formattedMeals,
			total_price,
			image_url,
			content,
		}),
	})
		.then(createdRation => createdRation.json())
		.catch(error => console.log('Ошибка добавления ration', error));
};
