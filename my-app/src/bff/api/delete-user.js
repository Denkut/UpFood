export const deleteUser = (userId) =>
	fetch(`http://localhost:4000/users/${userId}`, {
		method: 'DELETE',
	}).catch((error) => console.log('Ошибка удаления user', error));