import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../actions';
import { server } from '../../bff';
import { selectCart, selectUser } from '../../selectors';

export const UpdateQuantityButton = ({ itemId, count, itemType }) => {
	const userCart = useSelector(selectCart);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(count);

	useEffect(() => {
		setQuantity(count);
	}, [count]);

	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState(null);

	const handleDecreaseClick = async () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(prevQuantity => prevQuantity - 1);
			await updateQuantity(newQuantity);
		}
	};
	const handleIncreaseClick = async () => {
		const newQuantity = quantity + 1;
		setQuantity(prevQuantity => prevQuantity + 1);
		await updateQuantity(newQuantity);
	};

	const updateQuantity = async newQuantity => {
		setIsLoading(true);
		try {
			const { error, res } = await server.updateCartItemQuantity(
				itemId,
				itemType,
				user.id,
				userCart,
				newQuantity,
			);

			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setIsLoading(false);
				return;
			}
			dispatch(setCart(res));

			const currentUserDataJSON = sessionStorage.getItem('userData');
			if (currentUserDataJSON) {
				const currentUserData = JSON.parse(currentUserDataJSON);
				currentUserData.cart = res;
				sessionStorage.setItem(
					'userData',
					JSON.stringify(currentUserData),
				);
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
				disabled={isLoading || quantity === 1}
				className="text-1xl cursor-pointer text-emerald-600 hover:text-emerald-900"
			>
				-
			</button>
			<span className="text-1xl mx-2">{quantity}</span>{' '}
			<button
				onClick={handleIncreaseClick}
				disabled={isLoading}
				className="text-1xl cursor-pointer text-emerald-600 hover:text-emerald-900"
			>
				+
			</button>
			{serverError && <p style={{ color: 'red' }}>{serverError}</p>}
		</div>
	);
};

UpdateQuantityButton.propTypes = {
	itemId: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	itemType: PropTypes.string.isRequired,
};
