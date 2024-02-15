export const updateRation = ({
	id,
	imageUrl,
	title,
	type,
	calories,
	dietCategory,
	price,
	ingredients,
	goal,
}) =>
	fetch(`http://localhost:3005/rations/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			type,
			calories,
			dietCategory,
			price,
			ingredients,
			goal,
		}),
	})
		.then(loadedRation => loadedRation.json())
		.catch(error => console.log('Ошибка обновления role_id', error));
