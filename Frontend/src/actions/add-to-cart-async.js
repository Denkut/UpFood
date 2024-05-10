import { setCart } from './set-cart';
export const loadToCartAsync = (requestServer, cartId) => dispatch =>
	requestServer('addToCart', cartId).then(cartData => {
		if (cartData.res) {
			dispatch(setCart(cartData.res));
		}
		return cartData;
	});
