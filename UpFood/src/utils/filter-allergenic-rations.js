export const filterAllergenicRations = (rations, userAllergies) => {
	const markedRations = [];
	const unmarkedRations = [];

	rations.forEach(ration => {
		let hasAllergen = false;
		ration.meals.forEach(meal => {
			if (
				meal.items.some(item =>
					item.ingredients.some(id =>
						userAllergies.includes(String(id)),
					),
				)
			) {
				hasAllergen = true;
			}
		});

		if (hasAllergen) {
			markedRations.push(ration);
		} else {
			unmarkedRations.push(ration);
		}
	});

	return { markedRations, unmarkedRations };
};
