import { deleteRation } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeRation = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	deleteRation(id);

	return {
		error: null,
		res: true,
	};
};
