import React, { useState } from 'react';
import { selectUser } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../bff';
import { setCart } from '../../actions';

export const AddToCartButton = ({ itemId, itemType, className }) => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState(null);

	const handleAddToCartClick = async () => {
		setIsLoading(true);
		try {
			const { error, res } = await server.addToCart(
				{
					id: itemId,
					count: 1,
				},
				itemType,
				user.id,
				user.cart,
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
			<button onClick={handleAddToCartClick} className={className}>
				{isLoading ? 'Добавление...' : 'Добавить в корзину'}
			</button>
			{serverError && <p style={{ color: 'red' }}>{serverError}</p>}
		</div>
	);
};
