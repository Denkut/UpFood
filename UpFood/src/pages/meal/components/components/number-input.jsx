import React from 'react';

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
