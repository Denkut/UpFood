import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { loadMealsAsync } from '../../actions';
import { selectMeals } from '../../selectors';
import { MealContent } from './components';
import { useServerRequest } from '../../hooks';

export const Meal = () => {
	const dispatch = useDispatch();
	// const params = useParams();
	const requestServer = useServerRequest();
	const meals = useSelector(selectMeals);

	useEffect(() => {
		// Загрузка всех блюд
		dispatch(loadMealsAsync(requestServer)).then(result => {
			console.log(result);
		});
	}, [dispatch, requestServer]);

	// useEffect(() => {
	// 	dispatch(loadMealAsync(requestServer, params.id));
	// }, [dispatch, requestServer, params.id]);

	return (
		<div>
			{meals.map(meal => (
				<div key={meal.id}>
					<MealContent key={meal.id} meal={meal} />
					{/* Добавьте ссылку на подробную информацию о блюде */}
					<Link to={`/meal/${meal.id}`}>Подробнее</Link>
				</div>
			))}
		</div>
	);
};
