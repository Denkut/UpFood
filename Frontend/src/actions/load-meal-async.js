import { request } from "../utils";
import { setMealData } from "./set-meal-data";

export const loadMealAsync = (id) => (dispatch) =>
  request(`/api/meals/${id}`).then((mealData) => {
    if (mealData.data) {
      dispatch(setMealData(mealData.data));
    }
    return mealData;
  });
