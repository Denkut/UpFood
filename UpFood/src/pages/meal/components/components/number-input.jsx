import React from 'react';
import PropTypes from 'prop-types';

export const NumberInput = ({ value, onChange, suffix }) => {
	return (
		<span className="mr-2">
			<input
				type="number"
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
			{suffix}
		</span>
	);
};

NumberInput.propTypes = {
	suffix: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
