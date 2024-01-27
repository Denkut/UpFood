import { ACTION_TYPE } from './action-type';

export const setMealData = mealData => ({
	type: ACTION_TYPE.SET_MEAL_DATA,
	payload: mealData,
});
