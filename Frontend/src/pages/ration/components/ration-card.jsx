import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AddToCartButton } from "../../../components";
import { ROLE } from "../../../constants";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../selectors";

export const RationCard = ({
  id,
  title,
  imageUrl,
  goal,
  totalCalories,
  totalPrices,
  goals,
  content,
  mealTitles,
  isMarked,
  userGoal,
}) => {
  const roleId = useSelector(selectUserRole);

  const displayMeals =
    mealTitles && mealTitles.length > 0
      ? mealTitles.slice(0, 3).map((meal, index) => (
          <span key={index}>
            {meal}
            {index !== mealTitles.length - 1 && ", "}
          </span>
        ))
      : null;

  const ellipsis =
    mealTitles && mealTitles.length > 3 ? <span>...</span> : null;

  const goalName =
    goals[0].goal.find((item) => item.id === goal)?.name || "Цель не указана";

  const isUserGoalMatching = userGoal === goal;

  return (
    <div
      className={`mx-auto flex w-auto flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl xl:w-96 ${
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
      <Link className="flex h-full flex-col" to={`/ration/${id}`}>
        <img
          className="h-48 w-full object-cover object-center"
          src={imageUrl}
          alt={title}
        />
        <div className="flex flex-grow flex-col justify-between p-6">
          <h4 className="mb-2 text-xl font-bold">{title}</h4>
          <div className="flex items-center">
            <span className="text-gray-500">Общие калории:</span>
            <span className="ml-2 text-gray-700"> {totalCalories}</span>
          </div>
          <div className="mt-4">
            <h4 className="mb-2 text-emerald-600">
              <div className="mb-2 text-emerald-900"> Блюда:</div>
              <div className="flex flex-col">
                {displayMeals.map((meal, index) => (
                  <span key={index}>{meal}</span>
                ))}
              </div>
              {ellipsis}
            </h4>
          </div>
          {content && (
            <div className="mb-4">
              <h4 className="text-gray-900">{content}</h4>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-amber-600 px-6 py-4">
          <span className="font-bold text-gray-100 ">₽{totalPrices}</span>
          <span className="font-bold text-gray-100">Цель: {goalName}</span>
        </div>
      </Link>

      {roleId !== ROLE.GUEST && (
        <div className="bg-gray-100 p-4">
          <AddToCartButton
            itemId={id}
            itemType="ration"
            className="w-full rounded-full bg-amber-800 px-4 py-2 font-bold text-white hover:bg-amber-700 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};

RationCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  goal: PropTypes.number.isRequired,
  totalCalories: PropTypes.number.isRequired,
  totalPrices: PropTypes.number.isRequired,
  mealTitles: PropTypes.array.isRequired,
  content: PropTypes.string.isRequired,
  isMarked: PropTypes.bool.isRequired,
  userGoal: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};
