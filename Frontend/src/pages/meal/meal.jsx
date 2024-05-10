import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { RESET_MEAL_DATA, loadMealAsync } from "../../actions";
import { selectMeal, selectUser } from "../../selectors";
import { MealContent, MealDescription, MealEdit } from "./components";
import { Error, LoadingSpinner, PrivateContent } from "../../components";
import { ROLE } from "../../constants";
import { fetchData } from "../../utils/api";

export const Meal = () => {
  const [error, setError] = useState(null);
  const isCreating = !!useMatch("/meal");
  const isEditing = !!useMatch("/meal/:id/edit");
  const dispatch = useDispatch();
  const params = useParams();
  const meal = useSelector(selectMeal);
  const user = useSelector(selectUser);
  const userAllergies = user.allergenicIngredients || [];

  const [isLoading, setIsLoading] = useState(true);
  const [diets, setDiets] = useState([]);
  const [types, setTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [goals, setGoals] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchDataForAll = async () => {
      try {
        const dietsData = await fetchData("diets");
        setDiets(dietsData);

        const typesData = await fetchData("types");
        setTypes(typesData);

        const ingredientsData = await fetchData("ingredients");
        setIngredients(ingredientsData);

        const goalsData = await fetchData("goals");
        setGoals(goalsData);

        setIsLoading(false);
        setDataLoaded(true);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };

    fetchDataForAll();

    dispatch(RESET_MEAL_DATA);

    if (!isCreating) {
      dispatch(loadMealAsync(params.id)).then((postData) => {
        setError(postData.error);
        setIsLoading(false);
      });
    }
  }, [dispatch, params.id, isCreating]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      {dataLoaded && (
        <>
          {isCreating || isEditing ? (
            <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
              <MealEdit
                meal={meal}
                types={types}
                diets={diets}
                ingredients={ingredients}
                goals={goals}
              />
            </PrivateContent>
          ) : (
            <>
              <MealContent diets={diets} types={types} meal={meal} />
              <MealDescription
                goal={meal.goal}
                userAllergies={userAllergies}
                ingredients={ingredients}
                ingredientsMeal={meal.ingredients}
                goals={goals}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
