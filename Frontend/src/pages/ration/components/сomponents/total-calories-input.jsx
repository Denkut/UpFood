import React from 'react';
import PropTypes from 'prop-types';

export const TotalCaloriesInput = ({ totalCalories, onChange }) => {
	return (
		<div className="mb-2 flex items-center text-gray-500">
			<div className="mr-2 items-center text-xl font-semibold text-emerald-900">
				Общее количество калорий:
				<input
					type="number"
					name="total_calories"
					value={totalCalories}
					placeholder="Общее количество калорий..."
					onChange={onChange}
					className="mt-1 w-full rounded-md border p-2"
				/>
			</div>
		</div>
	);
};

TotalCaloriesInput.propTypes = {
	totalCalories: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};
