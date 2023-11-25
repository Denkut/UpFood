export const setUserRole = (userId, roleId) =>
	fetch(`http://localhost:4000/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: roleId,
		}),
	}).catch((error) => console.log('Ошибка обновления role_id', error));
