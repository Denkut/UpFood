import { updateCart } from '../api';

export const removeCartItem = async (itemId, type, userId, userCart) => {
	// eslint-disable-next-line prefer-const
	let newCart = { ...userCart };

	const cartType = type === 'meal' ? 'meals' : 'rations';

	if (newCart[cartType]) {
		newCart[cartType] = newCart[cartType].filter(
			item => item.id !== itemId,
		);
	}

	const newCartFromServer = await updateCart(userId, {
		cart: newCart,
	});

	return {
		error: null,
		res: newCartFromServer,
	};
};
