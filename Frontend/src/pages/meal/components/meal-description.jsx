import PropTypes from "prop-types";

export const MealDescription = ({
  ingredientsMeal,
  ingredients: allIngredients,
  goal,
  goals,
  userAllergies,
}) => {
  const getIngredientNameById = (id) => {
    const ingredient = allIngredients[0].ingredient.find(
      (item) => item.id === id
    );
    return ingredient ? ingredient.name : "";
  };

  const isAllergen = (id) => {
    const idString = id.toString();
    return userAllergies.includes(idString);
  };

  const goalName =
    goals[0].goal.find((item) => item.id === goal)?.name || "Цель не указана";

  return (
    <div className="ml-5 items-center">
      <div className="flex">
        <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
          Цель:
        </span>
        <span className="mr-2 flex items-center text-lg">{goalName}</span>
      </div>
      <div className="flex">
        <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
          Ингредиенты:
        </span>
        <ul className="mr-2 flex flex-wrap items-center text-lg">
          {ingredientsMeal &&
            ingredientsMeal.map((id, index) => (
              <li
                key={id}
                className={`mr-2 ${isAllergen(id) ? "text-red-500" : ""}`}
              >
                {getIngredientNameById(id)}
                {index !== ingredientsMeal.length - 1 && ","}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

MealDescription.propTypes = {
  ingredientsMeal: PropTypes.array,
  goal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userAllergies: PropTypes.array.isRequired,
};
