import { ACTION_TYPE } from './action-type';

export const updateCartItemQuantity = (itemId, quantity) => ({
	type: ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY,
	payload: { itemId, quantity },
});
