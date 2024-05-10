import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveMealAsync } from "../../../actions";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ImageInput,
  IngredientList,
  IngredientSearch,
  NumberInput,
  SelectInput,
  SelectInputGoal,
  TextInput,
} from "../components/components";
import { PROP_TYPE } from "../../../constants";

export const MealEdit = ({
  meal: {
    id,
    title,
    imageUrl,
    type,
    calories,
    diet,
    price,
    ingredients: ingredientsMeal,
    goal,
  },
  types,
  ingredients: allIngredients,
  goals,
  diets,
  isCreating,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    title,
    imageUrl,
    type,
    calories,
    diet,
    price,
    goal,
    ingredients: ingredientsMeal || [],
    quantity: 1,
  });

  useEffect(() => {
    if (isCreating) {
      setEditedData({
        title: "",
        imageUrl: "",
        type: null,
        calories: null,
        diet: null,
        price: null,
        goal: null,
        ingredients: [],
      });
    }
  }, [isCreating]);

  const handleSave = () => {
    const editedDataToSend = {
      ...editedData,
      calories: parseInt(editedData.calories) || 0,
      diet: parseInt(editedData.diet) || 0,
      goal: parseInt(editedData.goal) || 0,
      price: parseInt(editedData.price) || 0,
      type: parseInt(editedData.type) || 0,
      quantity: 1,
    };
    dispatch(saveMealAsync(id, editedDataToSend)).then(({ id }) =>
      navigate(`/meal/${id}`)
    );
  };

  const handleInputChange = (name, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (id) => {
    setEditedData((prevData) => {
      const updatedIngredients = prevData.ingredients.includes(id)
        ? prevData.ingredients.filter((ingredientId) => ingredientId !== id)
        : [...prevData.ingredients, id];

      return {
        ...prevData,
        ingredients: updatedIngredients,
      };
    });
  };

  return (
    <div className="mb-6 flex rounded-md bg-white p-6 shadow-lg">
      <div className="flex-shrink-0">
        <ImageInput
          imageUrl={editedData.imageUrl}
          onImageUrlChange={(value) => handleInputChange("imageUrl", value)}
        />
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
        <div className="mb-2 d-flex align-items-center text-gray-900">
          <TextInput
            label="Название:"
            value={editedData.title}
            onChange={(value) => handleInputChange("title", value)}
          />
        </div>
        <div className="mb-2 d-flex align-items-center text-gray-500">
          <SelectInput
            label="Тип приема пищи:"
            options={types[0]?.type || []}
            value={editedData.type}
            onChange={(value) => handleInputChange("type", value)}
          />
        </div>
        <div className="mb-2 d-flex align-items-center text-gray-500">
          <NumberInput
            label="Калории:"
            value={editedData.calories}
            onChange={(value) => handleInputChange("calories", value)}
            suffix="ккал."
          />
        </div>
        <div className="mb-2 flex items-center text-red-900">
          <SelectInput
            label="Тип диет:"
            options={diets[0]?.diet || 0}
            value={editedData.diet}
            onChange={(value) => handleInputChange("diet", value)}
          />
        </div>
        <div className="mb-2 d-flex align-items-center text-gray-900">
          <TextInput
            label="Цена:"
            value={editedData.price}
            onChange={(value) => handleInputChange("price", value)}
            suffix="₽"
          />
        </div>
        <IngredientSearch
          allIngredients={allIngredients}
          selectedIngredients={editedData.ingredients}
          onIngredientChange={handleIngredientChange}
        />

        <IngredientList
          selectedIngredients={editedData.ingredients}
          allIngredients={allIngredients}
        />

        <SelectInputGoal
          label="Цель:"
          options={goals[0]?.goal || 0}
          value={editedData.goal}
          onChange={(value) => handleInputChange("goal", value)}
        />
      </div>
    </div>
  );
};

MealEdit.propTypes = {
  meal: PROP_TYPE.MEAL,
};
