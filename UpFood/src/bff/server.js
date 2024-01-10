import { addUser, getUser } from './api';
// import { createSession } from './create-session';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		return {
			erorr: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async register(regLogin, regPassword) {
		const existingUser = await getUser(regLogin);

		if (existingUser) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		const user = await addUser(regLogin, regPassword);
		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				registeredAt: user.registered_at,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
