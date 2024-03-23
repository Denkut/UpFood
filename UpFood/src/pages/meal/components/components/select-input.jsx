import React from 'react';

export const SelectInput = ({ label, options, value, onChange }) => {
	return (
		<div className="mr-2">
			{label}
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
			>
				<option value="">{`Выберите ${label.toLowerCase()}`}</option>
				{options.map(item => (
					<option key={item.id} value={item.name}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
};
