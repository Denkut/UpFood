import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Search, MealCard, Pagination } from '../main/components';
import debounce from 'lodash.debounce';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPageFromLinks } from '../main/utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectMeals, selectUser } from '../../selectors';
import { setMeals } from '../../actions';
import { filterAllergenicMeals } from '../../utils';

export const MealList = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [filterType, setFilterType] = useState('');
	const [filterCalories, setFilterCalories] = useState('');
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const meals = useSelector(selectMeals);
	const user = useSelector(selectUser);
	const userAllergies = user.allergenicIngredients || [];
	const { unmarkedMeals, markedMeals } = filterAllergenicMeals(
		meals,
		userAllergies,
	);
	const sortedMeals = [...unmarkedMeals, ...markedMeals];

	useEffect(() => {
		const fetchMeals = async () => {
			requestServer(
				'fetchMeals',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
				filterType,
				filterCalories,
			).then(({ res: { meals, links } }) => {
				dispatch(setMeals(meals));
				setLastPage(getLastPageFromLinks(links));
			});
		};

		fetchMeals();
	}, [requestServer, page, shouldSearch, filterType, filterCalories]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleTypeFilter = type => {
		setFilterType(type);
	};

	const handleCaloriesFilter = calories => {
		setFilterCalories(calories);
	};

	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<Search
				className=""
				searchPhrase={searchPhrase}
				onChange={onSearch}
			/>

			<div className="mt-4 flex justify-center">
				<button
					onClick={() => handleTypeFilter('breakfast')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'breakfast'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Завтрак
				</button>
				<button
					onClick={() => handleTypeFilter('lunch')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'lunch'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Обед
				</button>
				<button
					onClick={() => handleTypeFilter('dinner')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'dinner'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Ужин
				</button>
			</div>

			<div className="mt-4 flex justify-center">
				<button
					onClick={() => handleCaloriesFilter('low')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterCalories === 'low'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Низкокалорийные
				</button>
				<button
					onClick={() => handleCaloriesFilter('medium')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterCalories === 'medium'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Среднекалорийные
				</button>
				<button
					onClick={() => handleCaloriesFilter('high')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterCalories === 'high'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Высококалорийные
				</button>
			</div>

			<h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900 ">
				Наши блюда
			</h2>
			{sortedMeals.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{sortedMeals.map(
						({
							id,
							title,
							imageUrl,
							type,
							calories,
							dietCategory,
							ingredients,
							goal,
							price,
						}) => (
							<MealCard
								key={id}
								id={id}
								title={title}
								imageUrl={imageUrl}
								type={type}
								calories={calories}
								dietCategory={dietCategory}
								ingredients={ingredients}
								goal={goal}
								price={price}
								userAllergies={userAllergies}
							/>
						),
					)}
				</div>
			) : (
				<p>Загрузка блюд...</p>
			)}
			{lastPage > 1 && meals.length > 0 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};
