import { ACTION_TYPE } from './action-type';

export const loadMealSuccess = meal => ({
	type: ACTION_TYPE.LOAD_MEAL_SUCCESS,
	payload: meal,
});
