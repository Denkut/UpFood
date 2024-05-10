export const removeCartAsync =
	(requestServer, itemId, type, userId, userCart) => () =>
		requestServer('removeCartItem', itemId, type, userId, userCart);
