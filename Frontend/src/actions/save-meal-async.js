import { request } from "../utils";
import { setMealData } from "./set-meal-data";

export const saveMealAsync = (id, newMealData) => (dispatch) => {
  
  const saveRequest = id
    ? request(`/meals/${id}`, "PATCH", newMealData)
    : request("/meals", "POST", newMealData);

  return saveRequest.then((updatedMeal) => {
    dispatch(setMealData(updatedMeal.data));

    return updatedMeal.data;
  });
};
