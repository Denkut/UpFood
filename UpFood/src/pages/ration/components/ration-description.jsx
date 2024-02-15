import React from 'react';

export const RationDescription = ({ ration }) => {
	return (
		<div className="ml-5 items-center">
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Цель:
				</span>
				<span className="mr-2 flex items-center text-lg">
					{ration.goal}
				</span>
			</div>
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Контент:
				</span>
				<div className="mr-2 flex items-center text-lg">
					<p>{ration.content}</p>
				</div>
			</div>
		</div>
	);
};
