import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../actions";
import { selectUser } from "../../selectors";
import { request } from "../../utils";

export const UpdateQuantityButton = ({ itemId, quantity }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [quantityRation, setQuantityRation] = useState(quantity);

  useEffect(() => {
    setQuantityRation(quantity);
  }, [quantity]);

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleDecreaseClick = async () => {
    if (quantityRation > 1) {
      const newQuantity = quantityRation - 1;
      setQuantityRation((prevQuantity) => prevQuantity - 1);
      await updateQuantity(newQuantity);
    }
  };
  const handleIncreaseClick = async () => {
    const newQuantity = quantityRation + 1;
    setQuantityRation((prevQuantity) => prevQuantity + 1);
    await updateQuantity(newQuantity);
  };

  const updateQuantity = async (newQuantity) => {
    setIsLoading(true);
    try {
      const { error, data } = await request(
        `/api/cart/${user.id}/${itemId}`,
        "PATCH",
        { quantity: newQuantity }
      );

      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        setIsLoading(false);
        return;
      }
      dispatch(setCart(data));

      const currentUserDataJSON = sessionStorage.getItem("userData");
      if (currentUserDataJSON) {
        const currentUserData = JSON.parse(currentUserDataJSON);
        currentUserData.cart = data;
        sessionStorage.setItem("userData", JSON.stringify(currentUserData));
      }

      setIsLoading(false);
    } catch (error) {
      setServerError(`Ошибка запроса: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="py-4">
      <button
        onClick={handleDecreaseClick}
        disabled={isLoading || quantityRation === 1}
        className="text-1xl cursor-pointer text-emerald-600 hover:text-emerald-900"
      >
        -
      </button>
      <span className="text-1xl mx-2">{quantityRation}</span>{" "}
      <button
        onClick={handleIncreaseClick}
        disabled={isLoading}
        className="text-1xl cursor-pointer text-emerald-600 hover:text-emerald-900"
      >
        +
      </button>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
    </div>
  );
};

UpdateQuantityButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  itemType: PropTypes.string.isRequired,
};
