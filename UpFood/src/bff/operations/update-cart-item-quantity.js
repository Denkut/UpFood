import { updateCart } from '../api';

export const updateCartItemQuantity = async (
	itemId,
	type,
	userId,
	userCart,
	newQuantity,
) => {
	// eslint-disable-next-line prefer-const
	let newCart = { ...userCart };

	const cartType = type === 'meal' ? 'meals' : 'rations';

	if (newCart[cartType]) {
		const itemToUpdate = newCart[cartType].find(item => item.id === itemId);

		if (itemToUpdate) {
			itemToUpdate.count = newQuantity;
		}
	}

	const newCartFromServer = await updateCart(userId, {
		cart: newCart,
	});
	return {
		error: null,
		res: newCartFromServer,
	};
};
