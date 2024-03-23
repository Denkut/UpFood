import React from 'react';
import { goals } from '../../../../bff/constants';

export const GoalSelection = ({ goal, onGoalChange }) => {
	return (
		<div className="mb-2 flex items-center text-lg">
			<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
				Цель:
			</span>
			<select
				value={goal}
				onChange={onGoalChange}
				className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
			>
				<option value="" disabled={!goal}>
					{goal ? goal : 'Выберите цель'}
				</option>
				{goals.map(item => (
					<option key={item.id} value={item.name}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};
