export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:4000/sessions/${sessionId}`, {
		method: 'DELETE',
	}).catch((error) => console.log('Ошибка удаления user', error));
