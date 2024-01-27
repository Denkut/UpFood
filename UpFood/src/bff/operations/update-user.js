import { setUser } from '../api';
import { sessions } from '../sessions';

export const updateUser = async (user, profileFormData) => {
	await setUser(user.id, profileFormData);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			session: sessions.create(user),
			...profileFormData,
		},
	};
};
