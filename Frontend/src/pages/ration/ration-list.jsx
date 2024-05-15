import React, { useEffect, useMemo, useState } from "react";
import { Search, RationCard, Pagination } from "../main/components";
import debounce from "lodash.debounce";
import { PAGINATION_LIMIT } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectRations, selectUser } from "../../selectors";
import { setRations } from "../../actions";
import { fetchData, filterAllergenicRations, request } from "../../utils";
import { LoadingSpinner } from "../../components";

export const RationList = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const rations = useSelector(selectRations);
  const user = useSelector(selectUser);
  const userAllergies = user.allergenicIngredients || [];
  const userGoal = user.goal || [];
  const { markedRations, unmarkedRations } = filterAllergenicRations(
    rations,
    userAllergies
  );
  const sortedRations = [...unmarkedRations, ...markedRations];
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchDataRation = async () => {
      setIsLoading(true);
      try {
        const {
          data: { rations, lastPage },
        } = await request(
          `api/rations?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
        );
        dispatch(setRations(rations));
        setLastPage(lastPage);

        const goalsData = await fetchData("goals");
        setGoals(goalsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataRation();
  }, [searchPhrase, page, dispatch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <Search className="" searchPhrase={searchPhrase} onChange={onSearch} />

      <h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900 ">
        Наши рационы
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : sortedRations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
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
              const mealTitles = meals.map((meal) => meal.title || "");

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
        <p>Нет доступных рационов.</p>
      )}
      {lastPage > 1 && rations.length > 0 && (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      )}
    </div>
  );
};
