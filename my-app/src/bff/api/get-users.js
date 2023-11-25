import { transformUser } from '../transformers';

export const getUsers = () =>
	fetch('http://localhost:4000/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser))
		.catch((error) => console.log('Ошибка получения users', error));