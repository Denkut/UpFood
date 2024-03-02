export const updateCartItemQuantityAsync = ({ id, count }) =>
	fetch(`http://localhost:3005/carts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			count,
		}),
	})
		.then(response => response.json())
		.catch(error => console.log('Ошибка обновления cart', error));
