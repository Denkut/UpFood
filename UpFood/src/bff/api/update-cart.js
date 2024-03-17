export const updateCart = async (userId, user) => {
	try {
		const response = await fetch(`http://localhost:3005/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`);
		}

		const updatedUser = await response.json();

		return updatedUser.cart;
	} catch (error) {
		throw new Error(`Ошибка при обновлении корзины пользователя: ${error}`);
	}
};
