import { transformPost } from '../transformers';

export const getPosts = (page, limit) =>
	fetch(`http://localhost:4000/posts?_page=${page}&_limit=${limit}`)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}))
		.catch((error) => console.log('Ошибка получения posts, links', error));
