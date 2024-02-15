import { ACTION_TYPE } from './action-type';

export const removeMealFromRation = mealId => ({
	type: ACTION_TYPE.REMOVE_MEAL_FROM_RATION,
	payload: mealId,
});
