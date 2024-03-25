import React, { useEffect, useMemo, useState } from 'react';
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
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const meals = useSelector(selectMeals);
	const user = useSelector(selectUser);
	const userGoal = user.goal || [];
	const userAllergies = user.allergenicIngredients || [];
	const { unmarkedMeals, markedMeals } = filterAllergenicMeals(
		meals,
		userAllergies,
	);
	const sortedMeals = [...unmarkedMeals, ...markedMeals].filter(meal => {
		if (filterType === '') {
			return true;
		}
		return meal.type === filterType;
	});

	useEffect(() => {
		const fetchMeals = async () => {
			requestServer(
				'fetchMeals',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
				filterType,
			).then(({ res: { meals, links } }) => {
				dispatch(setMeals(meals));
				setLastPage(getLastPageFromLinks(links));
			});
		};

		fetchMeals();
	}, [requestServer, page, shouldSearch, filterType]);

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

	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<Search
				className=""
				searchPhrase={searchPhrase}
				onChange={onSearch}
			/>

			<div className="mt-4 flex justify-center">
				<button
					onClick={() => handleTypeFilter('Завтрак')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'Завтрак'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Завтрак
				</button>
				<button
					onClick={() => handleTypeFilter('Обед')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'Обед' ? 'bg-emerald-500 text-white' : ''
					}`}
				>
					Обед
				</button>
				<button
					onClick={() => handleTypeFilter('Ужин')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === 'Ужин' ? 'bg-emerald-500 text-white' : ''
					}`}
				>
					Ужин
				</button>
				<button
					onClick={() => handleTypeFilter('')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterType === '' ? 'bg-emerald-500 text-white' : ''
					}`}
				>
					Все блюда
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
						}) => {
							const isMarked = !!markedMeals.find(
								meal => meal.id === id,
							);
							return (
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
									userGoal={userGoal}
									isMarked={isMarked}
								/>
							);
						},
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
