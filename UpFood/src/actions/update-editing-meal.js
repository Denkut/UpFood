import { ACTION_TYPE } from './action-type';

export const updateEditedMealData = editedData => ({
	type: ACTION_TYPE.UPDATE_EDITED_MEAL_DATA,
	payload: editedData,
});
