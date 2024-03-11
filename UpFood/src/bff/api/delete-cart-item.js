export const deleteCartItem = async (userId, user) => {
	try {
		const response = await fetch(`http://localhost:3005/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			console.log('Элемент успешно удален из корзины');
		} else {
			console.log(
				'Ошибка удаления элемента из корзины:',
				response.status,
			);
		}
	} catch (error) {
		console.error('Ошибка удаления элемента из корзины ', error);
	}
};
