import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCart } from "../../actions";
import {
  selectCart,
  selectUser,
  selectUserRole,
  selectUserSession,
} from "../../selectors";
import { MealItem, RationItem } from "./сomponents";
import { request } from "../../utils";
import { LoadingSpinner } from "../../components";
import { ROLE } from "../../constants";

export const Cart = () => {
  const dispatch = useDispatch();
  const userCart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const session = useSelector(selectUserSession);
  const mealsCart = userCart.meals || [];
  const rationsCart = userCart.rations || [];
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [filteredRations, setFilteredRations] = useState([]);
  const [mealsData, setMealsData] = useState({});
  const [visibleMeals, setVisibleMeals] = useState({});

  const toggleVisibleMeals = (rationId) => {
    setVisibleMeals((prevVisibleMeals) => ({
      ...prevVisibleMeals,
      [rationId]: !prevVisibleMeals[rationId],
    }));
  };
  useEffect(() => {
    const fetchMealsAndRations = async () => {
      if (([!ROLE.GUEST], userRole)) {
        return;
      }
      if (user) {
        setIsLoading(true);
        try {
          const cartsResponse = await request(`/cart/${user.id}`);
          const { meals, rations } = cartsResponse.data || {};

          const mealsToDisplay = meals.filter((meal) =>
            mealsCart.find((item) => item.id === meal.id && item.quantity > 0)
          );

          setFilteredMeals(mealsToDisplay);

          const rationsToDisplay = rations
            .filter((ration) =>
              rationsCart.find(
                (item) => item.id === ration.id && item.quantity > 0
              )
            )
            .map((ration) => {
              const matchingRationCart = rationsCart.find(
                (item) => item.id === ration.id
              );

              let totalPriceForRation = 0;

              ration.meals.forEach((meal) => {
                if (meal.price && typeof meal.price === "number") {
                  totalPriceForRation += meal.price;
                }
              });

              return {
                ...ration,
                totalPrice: totalPriceForRation,
              };
            });

          setFilteredRations(
            rationsToDisplay.map((ration) => ({
              ...ration,
              totalPrice: ration.totalPrices,
            }))
          );

          const mealsObj = meals.reduce((acc, meal) => {
            acc[meal.id] = meal;
            return acc;
          }, {});
          setMealsData(mealsObj);
        } catch (error) {
          setServerError(`Ошибка запроса: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        dispatch(logout(session));
        sessionStorage.removeItem("userData");
      }
    };

    fetchMealsAndRations();
  }, [user, userRole, mealsCart, rationsCart, dispatch, session]);

  useEffect(() => {
    filteredRations.forEach((ration) => {
      let totalPriceForRation = 0;

      ration.meals.forEach((meal) => {
        if (meal.price && typeof meal.price === "number") {
          totalPriceForRation += meal.price;
        }
      });

      ration.totalPrice = totalPriceForRation;
    });

    const newTotalPrice =
      filteredMeals.reduce(
        (total, item) =>
          total +
          parseFloat(item.price) *
            (mealsCart.find((cartItem) => cartItem.id === item.id)?.quantity ||
              1),
        0
      ) +
      filteredRations.reduce(
        (total, ration) =>
          total +
          ration.totalPrice *
            (rationsCart.find((cartItem) => cartItem.id === ration.id)
              ?.quantity || 1),
        0
      );
    setTotalPrice(newTotalPrice);
  }, [filteredMeals, filteredRations, mealsCart, rationsCart]);

  const handleRemoveItem = async (itemId, type) => {
    setIsLoading(true);

    try {
      const { error } = await request(`/cart/${user.id}/${itemId}`, "DELETE");

      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
      } else {
        setFilteredMeals((prevMeals) =>
          prevMeals.filter((item) => item.id !== itemId && item.type !== type)
        );
        setFilteredRations((prevRations) =>
          prevRations.filter((item) => item.id !== itemId && item.type !== type)
        );

        const updatedCartResponse = await request(`/cart/${user.id}`);
        const { meals: updatedMeals, rations: updatedRations } =
          updatedCartResponse.data || {};

        dispatch(setCart({ meals: updatedMeals, rations: updatedRations }));

        const currentUserDataJSON = sessionStorage.getItem("userData");
        if (currentUserDataJSON) {
          const currentUserData = JSON.parse(currentUserDataJSON);
          currentUserData.cart = {
            meals: updatedMeals,
            rations: updatedRations,
          };
          sessionStorage.setItem("userData", JSON.stringify(currentUserData));
        }
      }
    } catch (error) {
      setServerError(`Ошибка запроса: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="mb-4 text-3xl font-bold">Корзина</h2>
      {isLoading && <LoadingSpinner />}
      {serverError && <p>{serverError}</p>}

      {filteredMeals.length === 0 && filteredRations.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          {filteredMeals.map((item) => (
            <MealItem
              key={item.id}
              item={item}
              quantity={
                mealsCart.find((cartItem) => cartItem.id === item.id)
                  ?.quantity || 1
              }
              handleRemoveItem={handleRemoveItem}
              isLoading={isLoading}
              mealsData={mealsData}
            />
          ))}
          {filteredRations.map((ration) => (
            <RationItem
              key={ration.id}
              ration={ration}
              quantity={
                rationsCart.find((cartItem) => cartItem.id === ration.id)
                  ?.quantity || 1
              }
              visibleMeals={visibleMeals}
              toggleVisibleMeals={toggleVisibleMeals}
              handleRemoveItem={handleRemoveItem}
              isLoading={isLoading}
              mealsData={mealsData}
            />
          ))}
          <div className="mt-4">
            <p className="text-xl font-semibold">
              Общая стоимость: {totalPrice} ₽
            </p>
            <button className="mt-4 rounded-md bg-emerald-800 px-4 py-2 text-white">
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
