import { ACTION_TYPE } from './action-type';

export const setRationData = rationData => ({
	type: ACTION_TYPE.SET_RATION_DATA,
	payload: rationData,
});
