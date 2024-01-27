import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadMealAsync } from '../../actions';
import { selectMeal } from '../../selectors';
import { Description, MealContent } from './components';

export const Meal = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const meal = useSelector(selectMeal);

	useEffect(() => {
		dispatch(loadMealAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id]);

	return (
		<div>
			<MealContent meal={meal} />
			<Description
				ingredients={meal?.ingredients || []}
				suitableFor={meal?.suitableFor || []}
			/>
		</div>
	);
};
