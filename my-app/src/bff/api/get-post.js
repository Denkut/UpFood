import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:4000/posts/${postId}`)
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
		.catch((error) => console.log('Ошибка получения user', error));
