export const deleteCartItem = async (userId, cartType, cartId) => {
	try {
		const response = await fetch(
			`http://localhost:3005/users/${userId}/carts/${cartType}/${cartId}`,
			{
				method: 'DELETE',
			},
		);

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
