import { ACTION_TYPE } from './action-type';

export const setRations = rations => ({
	type: ACTION_TYPE.SET_RATIONS,
	payload: rations,
});
