import React, { useState } from "react";
import PropTypes from "prop-types";
import { selectUser } from "../../selectors";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../actions";
import { request } from "../../utils";

export const AddToCartButton = ({ itemId, itemType, className }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleAddToCartClick = async () => {
    setIsLoading(true);
    try {
      const productData =
        itemType === "meal"
          ? { meals: [{ id: itemId, quantity: 1 }] }
          : { rations: [{ id: itemId, quantity: 1 }] };

      const { error, data: updatedCart } = await request(
        `/api/cart/${user.id}`,
        "POST",
        productData
      );

      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        setIsLoading(false);
        return;
      }
      dispatch(setCart(updatedCart));

      let userData = sessionStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        userData.cart = updatedCart;
      } else {
        userData = { cart: updatedCart };
      }

      sessionStorage.setItem("userData", JSON.stringify(userData));

      setIsLoading(false);
    } catch (error) {
      setServerError(`Ошибка запроса: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4">
      <button onClick={handleAddToCartClick} className={className}>
        {isLoading ? "Добавление..." : "Добавить в корзину"}
      </button>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
    </div>
  );
};

AddToCartButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
};
