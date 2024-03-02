import { ACTION_TYPE } from './action-type';

export const addToCart = item => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: item,
});
