export const removeItemFromCartAsync = (requestServer, id) => () =>
	requestServer('removeCartItem', id);
