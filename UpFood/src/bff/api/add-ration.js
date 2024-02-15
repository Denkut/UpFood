export const addRation = ({
	title,
	total_calories,
	goal,
	meals,
	total_price,
	image_url,
	content,
	imageUrl,
}) => {
	const formattedMeals = meals.map(meal => ({
		...meal,
		items: meal.items.map(item => ({
			...item,
			mealId: item.mealId,
			quantity: item.quantity,
		})),
	}));

	return fetch('http://localhost:3005/rations', {
		method: 'POST',
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
			imageUrl,
		}),
	})
		.then(createdRation => createdRation.json())
		.catch(error => console.log('Ошибка добавления ration', error));
};
