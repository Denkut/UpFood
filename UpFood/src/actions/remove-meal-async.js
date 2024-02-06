export const removeMealAsync = (requestServer, id) => () =>
	requestServer('removeMeal', id);
