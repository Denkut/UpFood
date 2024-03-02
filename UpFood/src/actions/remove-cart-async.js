export const removeCartAsync = (requestServer, id) => () =>
	requestServer('removeCart', id);
