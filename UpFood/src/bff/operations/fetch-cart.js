import { getCart } from '../api';

export const fetchCart = async userId => {
	const cart = await getCart(userId);

	return {
		error: null,
		res: cart,
	};
};
