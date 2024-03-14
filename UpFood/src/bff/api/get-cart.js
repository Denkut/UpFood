import { transformCart } from '../transformers';

export const getCart = async userId => {
	try {
		const response = await fetch(`http://localhost:3005/users/${userId}`);
		const data = await response.json();

		return {
			error: null,
			res: transformCart(data.cart),
		};
	} catch (error) {
		return {
			error: `Error fetching cart: ${error.message}`,
			res: null,
		};
	}
};
