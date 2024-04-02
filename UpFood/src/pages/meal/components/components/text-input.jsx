import React from 'react';
import PropTypes from 'prop-types';

export const TextInput = ({ label, value, onChange }) => {
	return (
		<h2 className="mt-2 max-w-72 text-3xl font-semibold">
			{label}
			<input
				type="text"
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</h2>
	);
};

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
