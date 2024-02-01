import { ACTION_TYPE } from './action-type';

export const setMealsData = meals => ({
	type: ACTION_TYPE.SET_MEALS_DATA,
	payload: meals,
});
