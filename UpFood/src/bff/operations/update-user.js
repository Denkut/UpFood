import { setUser } from '../api';

export const updateUser = async (user, profileFormData) => {
	await setUser(user.id, profileFormData);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.roleId,
			...profileFormData,
		},
	};
};
