import { Link } from 'react-router-dom';
import Rations from '../../assets/picture/Rations.jpg';
import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import {
	Search,
	MealCard,
	Pagination,
	RationCard,
	BorderExplanationModal,
} from '../main/components';
import debounce from 'lodash.debounce';
import { getLastPageFromLinks } from './utils';
import { PAGINATION_LIMIT, ROLE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectMeals,
	selectRations,
	selectUser,
	selectUserRole,
} from '../../selectors';
import { setMeals, setRations } from '../../actions';
import { filterAllergenicMeals, filterAllergenicRations } from '../../utils';

export const Main = () => {
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [showRationBorderExplanation, setShowRationBorderExplanation] =
		useState(false);
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const meals = useSelector(selectMeals);
	const rations = useSelector(selectRations);
	const user = useSelector(selectUser);
	const roleId = useSelector(selectUserRole);
	const userGoal = user.goal || [];
	const userAllergies = user.allergenicIngredients || [];
	const { unmarkedMeals, markedMeals } = filterAllergenicMeals(
		meals,
		userAllergies,
	);
	const sortedMeals = [...unmarkedMeals, ...markedMeals];
	const { markedRations, unmarkedRations } = filterAllergenicRations(
		rations,
		userAllergies,
	);

	const sortedRations = [...unmarkedRations, ...markedRations];

	useEffect(() => {
		const fetchMealsAndRations = async () => {
			const mealsResponse = await requestServer(
				'fetchMeals',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
			);
			const rationsResponse = await requestServer(
				'fetchRations',
				searchPhrase,
				page,
				PAGINATION_LIMIT,
			);

			const { meals, links: mealsLinks } = mealsResponse.res;
			const { rations, links: rationsLinks } = rationsResponse.res;

			dispatch(setMeals(meals));
			dispatch(setRations(rations));

			const mealsLastPage = getLastPageFromLinks(mealsLinks);
			const rationsLastPage = getLastPageFromLinks(rationsLinks);
			const combinedLastPage = Math.max(mealsLastPage, rationsLastPage);

			setLastPage(combinedLastPage);
		};

		fetchMealsAndRations();
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 2000),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const toggleRationBorderExplanation = () => {
		setShowRationBorderExplanation(prevState => !prevState);
	};
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#c8ff80] to-[#dffc89] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>
			<div className="flex">
				<div className="mx-auto max-w-2xl py-10  ">
					<div className="text-center">
						<h1 className="pb-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-8xl ">
							UPFOOD
						</h1>
						<h3 className="text-2xl font-bold text-emerald-600">
							ПРОСТОТА ВО ВСЁМ
						</h3>
						<p className="mr-6 mt-6 text-lg leading-8 text-gray-700">
							Вам больше не нужно считать колории, мы сделали это
							за вас!
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link
								to="/"
								className="rounded-md bg-emerald-800    px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
							>
								НЕМНОГО О НАС
							</Link>
						</div>
					</div>
				</div>
				<img
					className=" z-10  h-96 w-auto rounded-2xl"
					src={Rations}
					alt="rations"
				/>
			</div>

			<Search
				className=""
				searchPhrase={searchPhrase}
				onChange={onSearch}
			/>

			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					className="bg-gradient-to-trfrom-[#c8ff80] relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 to-[#dffc89] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>

			<h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900">
				Наши рационы
			</h2>

			{sortedRations.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
					{sortedRations.map(
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
									meals={meals}
									userAllergies={userAllergies}
									isMarked={
										!!markedRations.find(r => r.id === id)
									}
									userGoal={userGoal}
									markedRations={markedRations}
								/>
							);
						},
					)}
				</div>
			) : (
				<p className=" cursor-pointer text-lg hover:text-emerald-700">
					Собери свой рацион
				</p>
			)}

			<h2 className="mb-6 mt-10 text-3xl font-bold text-gray-900">
				Наши блюда
			</h2>
			{sortedMeals.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
								userGoal={userGoal}
								isMarked={
									!!markedMeals.find(meal => meal.id === id)
								}
							/>
						),
					)}
				</div>
			) : (
				<p>Загрузка блюд...</p>
			)}
			{roleId !== ROLE.GUEST && (
				<>
					<button
						className="mt-3 rounded-md  bg-amber-700      px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
						onClick={toggleRationBorderExplanation}
					>
						ЦВЕТА ГРАНИЦ
					</button>

					{showRationBorderExplanation && (
						<BorderExplanationModal
							onClose={toggleRationBorderExplanation}
						/>
					)}
				</>
			)}
			{lastPage > 1 && (meals.length > 0 || rations.length > 0) && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
			)}
		</div>
	);
};
