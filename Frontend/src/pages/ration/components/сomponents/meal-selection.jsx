import React from 'react';
import PropTypes from 'prop-types';

export const MealSelection = ({
	meal,
	meals,
	index,
	onMealChange,
	onQuantityChange,
}) => {
	return (
		<div className="mt-4">
			<span>Блюдо {index + 1}:</span>
			<select
				value={meal.mealId}
				onChange={e => onMealChange(index, e.target.value)}
				className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
			>
				<option value="">Выберите блюдо</option>
				{meals.map(meal => (
					<option key={meal.id} value={meal.id}>
						{meal.title} - {meal.calories} ккал {meal.type}
					</option>
				))}
			</select>
			<button
				onClick={() => onQuantityChange(index, meal.quantity + 1)}
				className="ml-2 mt-2 rounded bg-emerald-800 p-2 text-white"
			>
				+
			</button>
			<span className="ml-2">{meal.quantity}</span>
			<button
				onClick={() => onQuantityChange(index, meal.quantity - 1)}
				className="ml-2 rounded bg-red-800 p-2 text-white"
				disabled={meal.quantity <= 1}
			>
				-
			</button>
		</div>
	);
};

MealSelection.propTypes = {
	meal: PropTypes.array.isRequired,
	meals: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	onMealChange: PropTypes.func.isRequired,
	onQuantityChange: PropTypes.func.isRequired,
};
