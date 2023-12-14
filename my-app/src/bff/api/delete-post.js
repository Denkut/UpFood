export const deletePost = async (postId) =>
	fetch(`http://localhost:4000/posts/${postId}`, {
		method: 'DELETE',
	}).catch((error) => console.log('Ошибка удаления поста ', error));
