import { ACTION_TYPE } from './action-type';

export const loadMealsSuccess = meals => ({
	type: ACTION_TYPE.LOAD_MEALS_SUCCESS,
	payload: meals,
});
