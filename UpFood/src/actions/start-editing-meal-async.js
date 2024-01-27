import { ACTION_TYPE } from './action-type';

export const startEditingMealAsync = () => dispatch => {
	dispatch({ type: ACTION_TYPE.START_EDITING_MEAL });
};
