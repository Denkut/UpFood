export const setRation = async (rationId, ration) => {
	const response = await fetch(`http://localhost:3005/rations/${rationId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(ration),
	});

	if (!response.ok) {
		throw new Error(`Ошибка: ${response.status}`);
	}

	const updatedRation = await response.json();
	return updatedRation;
};
