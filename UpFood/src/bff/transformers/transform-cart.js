export const transformCart = dbCart => {
	const transformCartItem = dbItem => ({
		id: dbItem.id,
		count: dbItem.count,
	});

	return {
		meals: dbCart.meals.map(transformCartItem),
		rations: dbCart.rations.map(transformCartItem),
	};
};
