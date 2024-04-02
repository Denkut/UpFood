import React from 'react';
import PropTypes from 'prop-types';

export const SelectInputGoal = ({ label, options, value, onChange }) => {
	return (
		<div className="mr-2">
			{label}
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
			>
				<option
					value=""
					disabled={label}
					hidden
				>{`Выберите ${label.toLowerCase()}`}</option>
				{options.map(item => (
					<option key={item.id} value={item.id}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};

SelectInputGoal.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
