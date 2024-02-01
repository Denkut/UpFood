export const setUser = async (userId, user) => {
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
	return updatedUser;
};
