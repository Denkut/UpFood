import { generateDate } from './generate-date';

export const addUser = (login, password) =>
	fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: generateDate(),
			role_id: 2,
		}),
	}).then((createrUser) => createrUser.json());
