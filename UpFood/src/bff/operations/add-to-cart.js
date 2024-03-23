import { updateCart } from '../api';

export const addToCart = async (itemId, type, userId, userCart) => {
	try {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		// eslint-disable-next-line prefer-const
		let newCart = currentUserDataJSON
			? JSON.parse(currentUserDataJSON).cart
			: userCart;

		const cartType = type === 'meal' ? 'meals' : 'rations';

		if (!newCart[cartType]) {
			newCart[cartType] = [itemId];
		} else {
			newCart[cartType] = [...newCart[cartType], itemId];
		}

		const newCartFromServer = await updateCart(userId, {
			cart: newCart,
		});

		return {
			error: null,
			res: newCartFromServer,
		};
	} catch (error) {
		console.error('Ошибка при добавлении товара в корзину:', error);
		return {
			error: error.message,
			res: null,
		};
	}
};
