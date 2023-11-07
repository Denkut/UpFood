export const getUsers = () =>
	fetch('http://localhost:4000/users').then((loadedUsers) => loadedUsers.json());
