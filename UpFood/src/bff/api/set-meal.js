export const setMeal = async (mealId, meal) => {
	const response = await fetch(`http://localhost:3005/meals/${mealId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(meal),
	});

	if (!response.ok) {
		throw new Error(`Ошибка: ${response.status}`);
	}

	const updatedMeal = await response.json();
	return updatedMeal;
};
