export const getRoles = () =>
	fetch('http://localhost:4000/roles')
		.then((loadedRoles) => loadedRoles.json())
		.catch((error) => console.log('Ошибка получения roles', error));