export const updatePost = ({ id, imageUrl, title, content }) =>
	fetch(`http://localhost:4000/posts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content,
		}),
	})
		.then((loadedPost) => loadedPost.json())
		.catch((error) => console.log('Ошибка обновления role_id', error));
