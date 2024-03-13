import React, { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Search, RationCard, Pagination } from '../main/components';
import debounce from 'lodash.debounce';
import { getLastPageFromLinks } from '../main/utils';
import { PAGINATION_LIMIT } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectRations } from '../../selectors';
import { setRations } from '../../actions';

export const RationList = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [filterGoal, setFilterGoal] = useState('');
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const rations = useSelector(selectRations);

	useEffect(() => {
		const fetchRations = async () => {
			requestServer(
				'fetchRations',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
				filterGoal,
			).then(({ res: { rations, links } }) => {
				dispatch(setRations(rations));
				setLastPage(getLastPageFromLinks(links));
			});
		};

		fetchRations();
	}, [requestServer, page, shouldSearch, filterGoal, dispatch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);
	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const handleGoalFilter = goal => {
		setFilterGoal(goal);
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
					onClick={() => handleGoalFilter('похудеть')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterGoal === 'похудеть'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Похудеть
				</button>
				<button
					onClick={() => handleGoalFilter('набрать массу')}
					className={`mx-2 rounded border px-4 py-2 ${
						filterGoal === 'набрать массу'
							? 'bg-emerald-500 text-white'
							: ''
					}`}
				>
					Набрать массу
				</button>
			</div>

			<h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900 ">
				Наши рационы
			</h2>
			{rations.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{rations.map(
						({ id, title, imageUrl, goal, meals, content }) => {
							const totalCalories = meals.reduce(
								(sum, meal) =>
									sum +
									Number(meal.items[0].calories) *
										meal.items[0].quantity,
								0,
							);
							const totalPrices = meals.reduce(
								(sum, meal) =>
									sum +
									Number(meal.items[0].price) *
										meal.items[0].quantity,
								0,
							);
							const mealTitles = meals.map(
								meal => meal.items[0].title,
							);

							return (
								<RationCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									goal={goal}
									totalCalories={totalCalories}
									totalPrices={totalPrices}
									mealTitles={mealTitles}
									content={content}
								/>
							);
						},
					)}
				</div>
			) : (
				<p>Загрузка рационов...</p>
			)}
			{lastPage > 1 && rations.length > 0 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};
