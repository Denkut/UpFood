import { ACTION_TYPE } from './action-type';

export const removeItemFromCart = itemId => ({
	type: ACTION_TYPE.REMOVE_ITEM_FROM_CART,
	payload: itemId,
});
