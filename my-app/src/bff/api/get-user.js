import { transformUser } from '../transformers';

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:4000/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser))
		.catch((error) => console.log('Ошибка получения user', error));