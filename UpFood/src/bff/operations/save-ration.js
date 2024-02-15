import { addRation, updateRation } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const saveRation = async (hash, newRationData) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const savedRation =
		newRationData.id === ''
			? await addRation(newRationData)
			: await updateRation(newRationData);

	return {
		error: null,
		res: savedRation,
	};
};
