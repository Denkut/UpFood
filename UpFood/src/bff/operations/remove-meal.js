import { deleteMeal } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const removeMeal = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	deleteMeal(id);

	return {
		error: null,
		res: true,
	};
};
