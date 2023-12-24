import { transformPost } from '../transformers';

export const getPosts = () =>
	fetch('http://localhost:4000/posts')
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost))
		.catch((error) => console.log('Ошибка получения posts', error));