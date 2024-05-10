import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { saveRationAsync } from "../../../actions";

export const RationEdit = ({ ration, meals, types, goals, isCreating }) => {
  const [editedData, setEditedData] = useState({
    title: ration.title || "",
    imageUrl: ration.imageUrl || "",
    content: ration.content || "",
    goal: ration.goal || "",
    meals: ration.meals || [],
    total_calories: 0,
  });
  const imageUrlRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goalRef = useRef(null);

  useEffect(() => {
    if (isCreating) {
      setEditedData({
        title: "",
        imageUrl: "",
        content: "",
        total_calories: 0,
        goal: "",
        total_prices: "",
        meals: [],
      });
    }
  }, [isCreating]);

  const handleSave = () => {
    const { total_calories, ...editedDataToSendWithoutTotalCalories } =
      editedData;
    const editedDataToSend = {
      ...editedDataToSendWithoutTotalCalories,
      goal: parseInt(editedData.goal) || 0,
      totalCalories: editedData.total_calories,
    };
    dispatch(saveRationAsync(ration.id, editedDataToSend)).then(({ id }) =>
      navigate(`/ration/${id}`)
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setEditedData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? +value : value,
    }));
  };

  const handleMealChange = (index, mealId, quantity) => {
    const updatedMeals = [...editedData.meals];
    const updatedQuantity = quantity < 1 ? 1 : quantity;

    const selectedMeal = meals.find((meal) => meal.id === mealId);

    updatedMeals[index] = {
      id: mealId,
      quantity: updatedQuantity,
      title: selectedMeal.title,
      calories: selectedMeal.calories,
      ingredients: selectedMeal.ingredients,
      price: selectedMeal.price,
      type: selectedMeal.type,
    };

    const totalCaloriesMeals = updatedMeals.reduce((total, meal) => {
      const selectedMeal = meals.find((m) => m.id === meal.id);
      return total + selectedMeal.calories * meal.quantity;
    }, 0);

    const totalPricesMeals = updatedMeals.reduce((total, meal) => {
      const selectedMeal = meals.find((m) => m.id === meal.id);
      return total + selectedMeal.price * meal.quantity;
    }, 0);

    setEditedData((prevData) => ({
      ...prevData,
      meals: updatedMeals,
      total_calories: totalCaloriesMeals,
      totalPrices: totalPricesMeals,
    }));
  };

  const handleContentChange = (e) => {
    const { value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };
  const handleGoalChange = (e) => {
    const { value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      goal: value,
    }));
  };

  return (
    <div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
      <div className="flex-shrink-0">
        <label className="mt-2 block text-sm font-medium text-gray-700">
          Название рациона:
          <input
            type="text"
            name="title"
            value={editedData.title}
            placeholder="Название рациона..."
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
          />
        </label>
      </div>

      <div className="ml-8 flex flex-col">
        <div className="flex items-center">
          <XMarkIcon
            onClick={() => navigate(-1)}
            className="h-6 w-6  mr-6 cursor-pointer rounded-lg text-base font-semibold leading-7 text-gray-900 hover:text-gray-400"
          />
          <button
            className="text-lg font-bold text-emerald-800 hover:text-emerald-600"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>

        <h2 className="mt-2 max-w-72 text-3xl font-semibold">
          {editedData.title}
        </h2>

        <div className="mb-2 flex items-center text-lg">
          <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
            Цель:
          </span>
          <select
            ref={goalRef}
            name="goal"
            value={editedData.goal}
            onChange={handleGoalChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
          >
            <option value="" disabled={!editedData.goal} hidden>
              {editedData.goal ? editedData.goal : "Выберите цель"}
            </option>
            {goals[0].goal.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2 mt-2 items-center text-lg">
          <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
            Блюда:
          </span>
          
          <div className="flex flex-col">
            {editedData.meals.map((meal, id) => (
              <div key={id} className="mt-4">
                <span>Блюдо {id + 1}:</span>
                <select
                  value={meal.id}
                  onChange={(e) =>
                    handleMealChange(id, e.target.value, meal.quantity)
                  }
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                >
                  <option value="">Выберите блюдо</option>
                  {meals.map((meal) => (
                    <option key={meal.id} value={meal.id}>
                      {meal.title} - {meal.calories} ккал.{" "}
                      {
                        types[0]?.type.find((type) => type.id === meal.type)
                          ?.name
                      }
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    handleMealChange(id, meal.id, meal.quantity + 1)
                  }
                  className="ml-2 mt-2 rounded bg-emerald-800 p-2 text-white"
                >
                  +
                </button>
                <span className="ml-2">{meal.quantity}</span>
                <button
                  onClick={() =>
                    handleMealChange(id, meal.id, meal.quantity - 1)
                  }
                  className="ml-2 rounded bg-red-800 p-2 text-white"
                  disabled={meal.quantity <= 1}
                >
                  -
                </button>
              </div>
            ))}
            {!isCreating && editedData.meals.length < 3 && (
              <div className="mt-4">
                <span>Блюдо {editedData.meals.length + 1}:</span>
                <select
                  value=""
                  onChange={(e) =>
                    handleMealChange(editedData.meals.length, e.target.value, 1)
                  }
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                >
                  <option value="">Выберите блюдо</option>
                  {meals.map((meal) => (
                    <option key={meal.id} value={meal.id}>
                      {meal.title} - {meal.calories} ккал {meal.type}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    handleMealChange(
                      editedData.meals.length,
                      editedData.meals.length > 0
                        ? editedData.meals[editedData.meals.length - 1].id
                        : "",
                      1
                    )
                  }
                  className="ml-2 mt-2 rounded bg-emerald-800 p-2 text-white"
                >
                  +
                </button>
                <span className="ml-2">1</span>
                <button
                  onClick={() =>
                    handleMealChange(
                      editedData.meals.length,
                      editedData.meals[editedData.meals.length - 1].id
                        ? editedData.meals[editedData.meals.length - 1].id
                        : "",
                      0
                    )
                  }
                  className="ml-2 rounded bg-red-800 p-2 text-white"
                  disabled={editedData.meals.length === 0}
                >
                  -
                </button>
              </div>
            )}
          </div>

          <div className="my-6 flex items-center text-gray-500">
            <div className="mr-2 items-center text-xl font-semibold text-emerald-900">
              Общее количество калорий:
              <input
                type="number"
                name="total_calories"
                value={editedData.total_calories}
                placeholder="Общее количество калорий..."
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border p-2"
              />
            </div>
          </div>

          <div className="mb-2 flex items-center text-lg">
            <span className="mr-2 items-center text-xl font-semibold text-emerald-900">
              Контент:
            </span>
            <textarea
              value={editedData.content}
              onChange={handleContentChange}
              className="focus:shadow-outline w-full rounded-md border px-3 py-2 focus:outline-none"
              rows="3"
            />
          </div>
          <div className="flex-shrink-0">
            <label className="mt-2 block text-sm font-medium text-gray-700">
              Ссылка на фото:
              <input
                ref={imageUrlRef}
                type="text"
                name="imageUrl"
                value={editedData.imageUrl || ""}
                placeholder="Изображение..."
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border p-2"
              />
            </label>
            <img
              src={editedData.imageUrl}
              alt={editedData.title}
              className="mb-4 h-[400px] w-[400px] rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

RationEdit.propTypes = {
  ration: PropTypes.object.isRequired,
  meals: PropTypes.array.isRequired,
  isCreating: PropTypes.bool,
};
