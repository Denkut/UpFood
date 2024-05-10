import React from 'react';
import PropTypes from 'prop-types';
import { MealSelection } from './meal-selection';

export const SelectedMeals = ({ mealsEditedData, meals, handleMealChange }) => {
	return (
		<div className="flex flex-col">
			{mealsEditedData.map((meal, index) => (
				<div key={index} className="mt-4">
					<span>Блюдо {index + 1}:</span>
					<MealSelection
						key={meal.items[0].mealId}
						meals={meals}
						selectedMealId={meal.items[0].mealId}
						onMealChange={selectedMealId =>
							handleMealChange(index, selectedMealId)
						}
					/>
					<button
						onClick={() =>
							handleMealChange(index, meal.items[0].quantity + 1)
						}
						className="ml-2 mt-2 rounded bg-emerald-800 p-2 text-white"
					>
						+
					</button>
					<span className="ml-2">{meal.items[0].quantity}</span>
					<button
						onClick={() =>
							handleMealChange(index, meal.items[0].quantity - 1)
						}
						className="ml-2 rounded bg-red-800 p-2 text-white"
						disabled={meal.items[0].quantity <= 1}
					>
						-
					</button>
				</div>
			))}
		</div>
	);
};

MealSelection.propTypes = {
	meals: PropTypes.array.isRequired,
	mealsEditedData: PropTypes.func.isRequired,
	handleMealChange: PropTypes.func.isRequired,
};
