import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { RESET_MEAL_DATA, loadMealAsync } from '../../actions';
import { selectMeal, selectUser } from '../../selectors';
import { MealContent, MealDescription, MealEdit } from './components';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

export const Meal = () => {
	const [error, setError] = useState(null);
	const isCreating = !!useMatch('/meal');
	const isEditing = !!useMatch('/meal/:id/edit');
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const meal = useSelector(selectMeal);
	const user = useSelector(selectUser);
	const userAllergies = user.allergenicIngredients || [];

	useLayoutEffect(() => {
		dispatch(RESET_MEAL_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadMealAsync(requestServer, params.id)).then(postData => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [dispatch, requestServer, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificMealPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<MealEdit meal={meal} />
			</PrivateContent>
		) : (
			<>
				<MealContent meal={meal} />
				<MealDescription
					ingredients={meal.ingredients}
					goal={meal.goal}
					userAllergies={userAllergies}
				/>
			</>
		);

	return error ? <Error error={error} /> : SpecificMealPage;
};
