import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'authorize',
				'updateUser',
				'fetchMeal',
				'fetchMeals',
				'fetchMealsCart',
				'fetchAllMeals',
				'fetchRation',
				'fetchRations',
				'fetchRationsCart',
				'fetchCart',
				'removeCartItem',
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
