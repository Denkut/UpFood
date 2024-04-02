import React from 'react';
import PropTypes from 'prop-types';

export const IngredientList = ({ selectedIngredients, allIngredients }) => {
	return (
		<div className="mb-2 mt-8 items-center text-lg">
			<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
				Выбранные ингредиенты:
			</span>
			<ul className="mr-2 flex flex-wrap items-center text-lg">
				{selectedIngredients.map((id, index) => (
					<li key={id} className="mb-2 mr-2">
						{allIngredients.find(item => item.id === id)?.name}
						{index !== selectedIngredients.length - 1 && ','}
					</li>
				))}
			</ul>
		</div>
	);
};

IngredientList.propTypes = {
	selectedIngredients: PropTypes.array,
	allIngredients: PropTypes.array,
};
