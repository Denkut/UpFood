import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { RESET_RATION_DATA, loadRationAsync, setMealsAll } from "../../actions";
import { RationContent, RationDescription, RationEdit } from "./components";
import { selectMeals, selectRation } from "../../selectors";
import { Error, LoadingSpinner, PrivateContent } from "../../components";
import { ROLE } from "../../constants";
import { request } from "../../utils";
import { fetchData } from "../../utils/api";

export const Ration = () => {
  const [error, setError] = useState(null);
  const isCreating = !!useMatch("/ration");
  const isEditing = !!useMatch("/ration/:id/edit");
  const dispatch = useDispatch();
  const params = useParams();
  const ration = useSelector(selectRation);
  const meals = useSelector(selectMeals);

  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [goals, setGoals] = useState([]);
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    const fetchDataForAll = async () => {
      try {
        const typesData = await fetchData("types");
        setTypes(typesData);

        const ingredientsData = await fetchData("ingredients");
        setIngredients(ingredientsData);

        const goalsData = await fetchData("goals");
        setGoals(goalsData);

        const dietsData = await fetchData("diets");
        setDiets(dietsData);

        setIsLoading(false);
        setDataLoaded(true);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };

    fetchDataForAll();

    dispatch(RESET_RATION_DATA);
    request("/meals")
      .then(({ data: { meals } }) => {
        dispatch(setMealsAll(meals));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setIsLoading(false);
      });

    if (!isCreating) {
      dispatch(loadRationAsync(params.id)).then((postData) => {
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
              <RationEdit
                ration={ration}
                meals={meals}
                types={types}
                ingredients={ingredients}
                goals={goals}
                diets={diets}
              />
            </PrivateContent>
          ) : (
            <>
              <RationContent
                ration={ration}
                meals={meals}
                types={types}
                ingredients={ingredients}
                goals={goals}
              />
              <RationDescription
                ration={ration}
                content={ration.content}
                goal={ration.goal}
                types={types}
                ingredients={ingredients}
                goals={goals}
                diets={diets}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
