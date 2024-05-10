import Rations from "../../assets/picture/Rations.jpg";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MealCard,
  Pagination,
  RationCard,
  BorderExplanationModal,
  AboutUsPopup,
} from "../main/components";
import debounce from "lodash.debounce";
import { PAGINATION_LIMIT, ROLE } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMeals,
  selectRations,
  selectUser,
  selectUserRole,
} from "../../selectors";
import { setMeals, setRations } from "../../actions";
import {
  filterAllergenicMeals,
  filterAllergenicRations,
  request,
} from "../../utils";
import { fetchData } from "../../utils/api";
import { LoadingSpinner } from "../../components";

export const Main = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [showRationBorderExplanation, setShowRationBorderExplanation] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const meals = useSelector(selectMeals);
  const rations = useSelector(selectRations);
  const user = useSelector(selectUser);
  const roleId = useSelector(selectUserRole);
  const [types, setTypes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [goals, setGoals] = useState([]);
  const [diets, setDiets] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isRecommended, setIsRecommended] = useState(false);
  const userGoal = user.goal || [];

  const userAllergies = user.allergenicIngredients || [];
  const { unmarkedMeals, markedMeals } = filterAllergenicMeals(
    meals,
    userAllergies
  );
  const sortedMeals = [...unmarkedMeals, ...markedMeals];
  const { markedRations, unmarkedRations } = filterAllergenicRations(
    rations,
    userAllergies
  );
  const sortedRations = [...unmarkedRations, ...markedRations];
  useEffect(() => {
    const fetchDataForAll = async () => {
      try {
        setIsLoading(true);
        const typesData = await fetchData("types");
        setTypes(typesData);

        const ingredientsData = await fetchData("ingredients");
        setAllIngredients(ingredientsData);

        const goalsData = await fetchData("goals");
        setGoals(goalsData);

        const dietsData = await fetchData("diets");
        setDiets(dietsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataForAll();
  }, []);

  useEffect(() => {
    const fetchMealsAndRations = async () => {
      try {
        const mealsResponse = await request(
          `/meals?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
        );
        const rationsResponse = await request(
          `/rations?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
        );

        const { meals, lastPage: mealsLastPage } = mealsResponse.data;
        const { rations, lastPage: rationsLastPage } = rationsResponse.data;

        dispatch(setMeals(meals));
        dispatch(setRations(rations));

        const combinedLastPage = Math.max(mealsLastPage, rationsLastPage);
        setLastPage(combinedLastPage);
      } catch (error) {
        console.error("Error fetching meals and rations:", error);
      }
    };

    fetchMealsAndRations();
  }, [page, searchPhrase, dispatch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const filterRecommendedItems = () => {
    const recommendedRations = sortedRations
      .filter((item) => {
        return item.goal === userGoal && !hasAllergenicIngredients(item);
      })
      .map((item) => ({ ...item, isAllergenic: false }));

    const recommendedMeals = sortedMeals
      .filter((item) => {
        return item.goal === userGoal && !hasAllergenicIngredients(item);
      })
      .map((item) => ({ ...item, isAllergenic: false }));

    setRecommendedItems([...recommendedRations, ...recommendedMeals]);
  };

  const hasAllergenicIngredients = (item) => {
    return item.allergens && item.allergens.length > 0;
  };

  const toggleRecommendedItems = () => {
    setIsRecommended((prevState) => !prevState);
  };

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  const toggleRationBorderExplanation = () => {
    setShowRationBorderExplanation((prevState) => !prevState);
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c8ff80] to-[#dffc89] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="flex">
            <div className="mx-auto max-w-2xl py-10">
              <div className="text-center">
                <h1 className="pb-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-8xl">
                  UPFOOD
                </h1>
                <h3 className="text-2xl font-bold text-emerald-600">
                  ПРОСТОТА ВО ВСЁМ
                </h3>
                <div className="mr-6 mt-6 text-lg leading-8 text-gray-700">
                  <h5>
                    Вам больше не нужно считать калории, мы сделали это за вас!
                  </h5>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <AboutUsPopup />
                </div>
              </div>
            </div>
            <img
              className="z-10 h-96 w-auto rounded-2xl"
              src={Rations}
              alt="rations"
            />
          </div>

          <Search
            className=""
            searchPhrase={searchPhrase}
            onChange={onSearch}
          />

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div
              className="bg-gradient-to-tr from-[#c8ff80] relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 to-[#dffc89] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          {roleId !== ROLE.GUEST && (
            <>
              <button
                className="mt-5 mr-5 rounded-md bg-slate-700 px-3.5 py-2.5 text-base  font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                onClick={toggleRationBorderExplanation}
              >
                Цвета рамок
              </button>

              {showRationBorderExplanation && (
                <BorderExplanationModal
                  onClose={toggleRationBorderExplanation}
                />
              )}
            </>
          )}

          <button
            className="mt-5 rounded-md bg-emerald-700 px-3.5 py-2.5 text-base  font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            onClick={() => {
              filterRecommendedItems();
              toggleRecommendedItems();
            }}
          >
            {isRecommended ? "Все" : "Рекомендуем"}
          </button>

          {isRecommended ? (
            <>
              <h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900">
                Рекомендуемые рационы и блюда
              </h2>
              {recommendedItems && recommendedItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {recommendedItems.map((item) => {
                    if (item.meals) {
                      return (
                        <RationCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          imageUrl={item.imageUrl}
                          goal={item.goal}
                          totalCalories={item.totalCalories}
                          totalPrices={item.totalPrices}
                          goals={goals}
                          content={item.content}
                          mealTitles={item.meals.map((meal) => meal.title)}
                          userAllergies={userAllergies}
                          isMarked={
                            !!markedRations.find((r) => r.id === item.id)
                          }
                          userGoal={userGoal}
                          markedRations={markedRations}
                        />
                      );
                    } else {
                      return (
                        <MealCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          imageUrl={item.imageUrl}
                          type={item.type}
                          calories={item.calories}
                          diet={item.diet}
                          ingredients={item.ingredients}
                          goal={item.goal}
                          price={item.price}
                          userAllergies={userAllergies}
                          userGoal={userGoal}
                          isMarked={
                            !!markedMeals.find((meal) => meal.id === item.id)
                          }
                          allIngredients={allIngredients}
                          types={types}
                          goals={goals}
                          diets={diets}
                        />
                      );
                    }
                  })}
                </div>
              ) : (
                <div>Нет рекомендованных рационов и блюд</div>
              )}
            </>
          ) : (
            <>
              <h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900">
                Наши рационы
              </h2>
              {sortedRations.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {sortedRations.map(
                    ({
                      id,
                      title,
                      imageUrl,
                      goal,
                      meals,
                      content,
                      totalCalories,
                      totalPrices,
                    }) => {
                      const mealTitles = meals
                        ? meals.map((meal) => meal.title || "")
                        : [];

                      return (
                        <RationCard
                          key={id}
                          id={id}
                          title={title}
                          imageUrl={imageUrl}
                          goal={goal}
                          totalCalories={totalCalories}
                          totalPrices={totalPrices}
                          goals={goals}
                          content={content}
                          mealTitles={mealTitles}
                          userAllergies={userAllergies}
                          isMarked={!!markedRations.find((r) => r.id === id)}
                          userGoal={userGoal}
                          markedRations={markedRations}
                        />
                      );
                    }
                  )}
                </div>
              ) : (
                <div>Загрузка рационов...</div>
              )}

              <h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900">
                Наши блюда
              </h2>
              {sortedMeals.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
                      const isMarked = !!markedMeals.find(
                        (meal) => meal.id === id
                      );
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
              ) : (
                <div>Загрузка блюд...</div>
              )}
            </>
          )}

          {lastPage > 1 && (meals.length > 0 || rations.length > 0) && (
            <Pagination setPage={setPage} page={page} lastPage={lastPage} />
          )}
        </>
      )}
    </div>
  );
};
