import { ACTION_TYPE } from './action-type';

export const cancelEditingMealAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE.CANCEL_EDITING_MEAL });
};
