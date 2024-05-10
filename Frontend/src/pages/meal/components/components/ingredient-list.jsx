import React from "react";
import PropTypes from "prop-types";

export const IngredientList = ({ selectedIngredients, allIngredients }) => {
  return (
    <span className="mr-2 items-center text-lg font-semibold text-emerald-700 ">
      <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
        Выбранные ингредиенты:
      </span>
      <ul className="mr-2 flex flex-wrap items-center text-lg">
        {selectedIngredients.map((id, index) => (
          <li key={id} className="mb-2 mr-2">
            {allIngredients[0].ingredient.find((item) => item.id === id)?.name}
            {index !== selectedIngredients.length - 1 && ","}
          </li>
        ))}
      </ul>
    </span>
  );
};

IngredientList.propTypes = {
  selectedIngredients: PropTypes.array,
  allIngredients: PropTypes.array,
};
