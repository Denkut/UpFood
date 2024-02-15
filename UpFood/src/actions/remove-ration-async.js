export const removeRationAsync = (requestServer, id) => () =>
	requestServer('removeRation', id);
