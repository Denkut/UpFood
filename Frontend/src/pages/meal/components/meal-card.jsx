import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AddToCartButton } from "../../../components";
import { ROLE } from "../../../constants";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";

export const MealCard = ({
  id,
  title,
  imageUrl,
  type,
  calories,
  diet,
  ingredients,
  goal,
  price,
  isMarked,
  userGoal,
  allIngredients,
  types,
  goals,
  diets,
}) => {
  const roleId = useSelector(selectUserRole);

  const displayIngredients = ingredients.slice(0, 5).map((id, index) => (
    <span key={id}>
      {allIngredients[0].ingredient.find((item) => item.id === id)?.name}
      {index !== 1 && ", "}
    </span>
  ));

  const ellipsis = ingredients.length > 2 ? <span>...</span> : null;

  const typeName =
    types[0].type.find((item) => item.id === type)?.name || "Тип не указан";

  const goalName =
    goals[0].goal.find((item) => item.id === goal)?.name || "Цель не указана";

  const dietName =
    diets[0].diet.find((item) => item.id === diet)?.name || "Диета не указана";

  const isUserGoalMatching = userGoal === goal;

  return (
    <div
      className={`mx-auto flex w-auto flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl lg:w-96  ${
        isMarked && isUserGoalMatching
          ? "border-2 border-emerald-500"
          : isUserGoalMatching
            ? "border-2 border-b-0 border-t-0 border-emerald-500"
            : isMarked
              ? "border-2 border-b-0 border-t-0 border-red-500"
              : ""
      }`}
      style={{
        borderTopColor: isMarked ? "red" : undefined,
        borderBottomColor: isMarked ? "red" : undefined,
        borderLeftColor: isUserGoalMatching ? "emerald" : undefined,
        borderRightColor: isUserGoalMatching ? "emerald" : undefined,
      }}
    >
      <Link className="flex h-full flex-col" to={`/meal/${id}`}>
        <img
          className="h-48 w-full object-cover object-center"
          src={imageUrl}
          alt={title}
        />
        <div className="flex flex-grow flex-col justify-between p-6">
          <h4 className="mb-2 text-xl font-bold">{title}</h4>

          <h4 className="mb-2 text-emerald-700">{typeName}</h4>
          <div className="mb-4 flex items-center">
            <span className="ml-2 text-gray-700">Каллории: {calories}</span>
            <span className="mx-2">&#8226;</span>
            <span className="ml-2 text-red-900">Диета: {dietName}</span>
          </div>
          <div className="mt-4">
            <h4 className="mb-2 text-emerald-900">Ингредиенты:</h4>
            <h4 className="mb-2 text-gray-700">
              {displayIngredients} {ellipsis}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-between bg-emerald-500 px-6 py-4">
          <span className="font-bold text-gray-100 ">₽{price}</span>
          <span className="font-bold text-gray-100">Цель: {goalName}</span>
        </div>
      </Link>

      {roleId !== ROLE.GUEST && (
        <div className="bg-gray-100 p-4">
          <AddToCartButton
            itemId={id}
            itemType="meal"
            className="w-full rounded-full bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

MealCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  diet: PropTypes.number.isRequired,
  ingredients: PropTypes.array.isRequired,
  goal: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  isMarked: PropTypes.bool.isRequired,
  userGoal: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};
