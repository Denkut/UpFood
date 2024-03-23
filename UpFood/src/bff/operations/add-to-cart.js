import { updateCart } from '../api';

export const addToCart = async (itemId, type, userId, userCart) => {
	try {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		// eslint-disable-next-line prefer-const
		let newCart = currentUserDataJSON
			? JSON.parse(currentUserDataJSON).cart
			: userCart;

		const cartType = type === 'meal' ? 'meals' : 'rations';

		const existingItem = newCart[cartType]?.find(
			item => item.id === itemId,
		);

		if (existingItem) {
			existingItem.count += 1;
		} else {
			newCart[cartType] = newCart[cartType] || [];
			newCart[cartType].push({
				id: itemId,
				count: 1,
			});
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
