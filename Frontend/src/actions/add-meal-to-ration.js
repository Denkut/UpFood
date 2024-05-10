import { ACTION_TYPE } from './action-type';

export const addMealToRation = meal => ({
	type: ACTION_TYPE.ADD_MEAL_TO_RATION,
	payload: meal,
});
