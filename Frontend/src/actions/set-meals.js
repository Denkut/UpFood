import { ACTION_TYPE } from './action-type';

export const setMeals = meals => ({
	type: ACTION_TYPE.SET_MEALS,
	payload: meals,
});
