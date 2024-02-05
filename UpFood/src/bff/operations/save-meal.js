import { addMeal, updateMeal } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const saveMeal = async (hash, newMealData) => {
	const accessRoles = [ROLE.ADMIN];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const savedMeal =
		newMealData.id === ''
			? await addMeal(newMealData)
			: await updateMeal(newMealData);

	return {
		error: null,
		res: savedMeal,
	};
};
