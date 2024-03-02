import { ACTION_TYPE } from './action-type';

export const setCart = cart => ({
	type: ACTION_TYPE.SET_CART,
	payload: cart,
});
