import { ACTION_TYPE } from './action-type';

export const setMealsAll = meals => ({
	type: ACTION_TYPE.SET_MEALS_All,
	payload: meals,
});
