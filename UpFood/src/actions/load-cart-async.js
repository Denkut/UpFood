import { fetchCart } from '../bff/operations';
import { setCart } from './set-cart';

export const loadCartAsync = userId => async dispatch => {
	try {
		const cartData = await fetchCart(userId);
		dispatch(setCart(cartData));
	} catch (error) {
		console.error('Error fetching cart:', error);
	}
};
