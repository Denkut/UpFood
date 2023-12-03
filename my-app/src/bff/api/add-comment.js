import { generateDate } from '../utils';

export const addComment = (userId, postId, content) =>
	fetch('http://localhost:4000/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			published_at: generateDate(),
			content,
		}),
	}).catch((error) => console.log('Ошибка добавления comment', error));
