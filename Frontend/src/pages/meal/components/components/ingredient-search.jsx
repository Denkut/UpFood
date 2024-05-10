import React, { useState } from "react";
import PropTypes from "prop-types";

export const IngredientSearch = ({
  allIngredients,
  selectedIngredients,
  onIngredientChange,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredIngredients = allIngredients[0].ingredient.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="mb-2 mt-8 items-center text-lg">
      <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
        Ингредиенты:
      </span>
      <input
        type="text"
        placeholder="Поиск ингредиентов..."
        className="mt-1 w-full rounded-md border p-2"
        value={searchValue}
        onChange={handleInputChange}
      />
      <div
        className={`mt-1 h-40 w-full overflow-y-auto rounded-md border bg-white shadow-lg ${
          filteredIngredients.length > 0 ? "visible" : "hidden"
        }`}
      >
        {filteredIngredients.map((item) => (
          <div key={item.id} className="mt-2">
            <label className="cursor-pointer text-base  font-semibold text-emerald-900 text-center hover:bg-emerald-100">
              <input
                className="mx-2 cursor-pointer items-center "
                type="checkbox"
                value={item.id}
                checked={selectedIngredients.includes(item.id)}
                onChange={() => onIngredientChange(item.id)}
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

IngredientSearch.propTypes = {
  selectedIngredients: PropTypes.array,
  allIngredients: PropTypes.array,
  onIngredientChange: PropTypes.func,
};
