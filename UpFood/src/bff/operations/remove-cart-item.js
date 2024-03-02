import { deleteCartItem } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeCartItem = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.CLIENT];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	deleteCartItem(id);

	return {
		error: null,
		res: true,
	};
};
