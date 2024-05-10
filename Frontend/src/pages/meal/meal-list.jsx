import React, { useEffect, useMemo, useState } from "react";
import { Search, MealCard, Pagination } from "../main/components";
import debounce from "lodash.debounce";
import { PAGINATION_LIMIT } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectMeals, selectUser } from "../../selectors";
import { setMeals } from "../../actions";
import { filterAllergenicMeals, request } from "../../utils";
import { fetchData } from "../../utils/api";
import { LoadingSpinner } from "../../components";

export const MealList = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const meals = useSelector(selectMeals);
  const user = useSelector(selectUser);

  const [types, setTypes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [goals, setGoals] = useState([]);
  const [diets, setDiets] = useState([]);
  const userGoal = user.goal || [];
  const userAllergies = user.allergenicIngredients || [];
  const { unmarkedMeals, markedMeals } = filterAllergenicMeals(
    meals,
    userAllergies
  );

  const sortedMeals = [...unmarkedMeals, ...markedMeals].filter((meal) => {
    if (filterType === "") {
      return true;
    }
    return meal.type === filterType;
  });

  useEffect(() => {
    const fetchDataForAll = async () => {
      setIsLoading(true);
      try {
        const [
          mealsResponse,
          typesData,
          ingredientsData,
          goalsData,
          dietsData,
        ] = await Promise.all([
          request(
            `/meals?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
          ),
          fetchData("types"),
          fetchData("ingredients"),
          fetchData("goals"),
          fetchData("diets"),
        ]);

        const { meals, lastPage } = mealsResponse.data;
        dispatch(setMeals(meals));
        setLastPage(lastPage);
        setTypes(typesData);
        setAllIngredients(ingredientsData);
        setGoals(goalsData);
        setDiets(dietsData);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForAll();
  }, [page, searchPhrase, dispatch]);

  const startDelayedSearch = useMemo(
    () => debounce(() => setShouldSearch(!shouldSearch), 2000),
    [shouldSearch]
  );

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch();
  };

  const handleTypeFilter = (type) => {
    let filterValue = type;
    if (type === "Завтрак") {
      filterValue = 1;
    } else if (type === "Обед") {
      filterValue = 2;
    } else if (type === "Ужин") {
      filterValue = 3;
    }
    setFilterType(filterValue);
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <Search className="" searchPhrase={searchPhrase} onChange={onSearch} />

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handleTypeFilter("")}
          className={`mx-2 rounded border px-4 py-2 ${
            filterType === "" ? "bg-emerald-500 text-white" : ""
          }`}
        >
          Все блюда
        </button>
        <button
          onClick={() => handleTypeFilter(1)}
          className={`mx-2 rounded border px-4 py-2 ${
            filterType === 1 ? "bg-emerald-500 text-white" : ""
          }`}
        >
          Завтрак
        </button>
        <button
          onClick={() => handleTypeFilter(2)}
          className={`mx-2 rounded border px-4 py-2 ${
            filterType === 2 ? "bg-emerald-500 text-white" : ""
          }`}
        >
          Обед
        </button>
        <button
          onClick={() => handleTypeFilter(3)}
          className={`mx-2 rounded border px-4 py-2 ${
            filterType === 3 ? "bg-emerald-500 text-white" : ""
          }`}
        >
          Ужин
        </button>
      </div>

      <h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900 ">
        Наши блюда
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sortedMeals.map(
            ({
              id,
              title,
              imageUrl,
              type,
              calories,
              diet,
              ingredients,
              goal,
              price,
            }) => {
              const isMarked = !!markedMeals.find((meal) => meal.id === id);
              return (
                <MealCard
                  key={id}
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  type={type}
                  calories={calories}
                  diet={diet}
                  ingredients={ingredients}
                  goal={goal}
                  price={price}
                  userAllergies={userAllergies}
                  userGoal={userGoal}
                  isMarked={isMarked}
                  allIngredients={allIngredients}
                  types={types}
                  goals={goals}
                  diets={diets}
                />
              );
            }
          )}
        </div>
      )}
      {lastPage > 1 && meals.length > 0 && (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      )}
    </div>
  );
};
