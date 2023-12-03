export const deleteComment = async (commentId) =>
	fetch(`http://localhost:4000/comments/${commentId}`, {
		method: 'DELETE',
	}).catch((error) => console.log('Ошибка удаления comment ', error));
