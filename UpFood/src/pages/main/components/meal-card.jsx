import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ingredients as allIngredients, goals } from '../../../bff/constants';
import { AddToCartButton } from '../../../components';
import { ROLE } from '../../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors';

export const MealCard = ({
	id,
	title,
	imageUrl,
	type,
	calories,
	dietCategory,
	ingredients,
	goal,
	price,
	isMarked,
	userGoal,
}) => {
	const roleId = useSelector(selectUserRole);

	const displayIngredients = ingredients.slice(0, 2).map((id, index) => (
		<span key={id}>
			{allIngredients.find(item => item.id === id)?.name}
			{index !== 1 && ', '}
		</span>
	));

	const ellipsis = ingredients.length > 2 ? <span>...</span> : null;

	const goalName =
		goals.find(item => String(item.id) === goal)?.name || 'Цель не указана';

	const isUserGoalMatching = String(userGoal) === goal;

	return (
		<div
			className={`mx-auto flex w-auto flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl lg:w-96  ${
				isMarked && isUserGoalMatching
					? 'border-2 border-emerald-500'
					: isUserGoalMatching
						? 'border-2 border-b-0 border-t-0 border-emerald-500'
						: isMarked
							? 'border-2 border-b-0 border-t-0 border-red-500'
							: ''
			}`}
			style={{
				borderTopColor: isMarked ? 'red' : undefined,
				borderBottomColor: isMarked ? 'red' : undefined,
				borderLeftColor: isUserGoalMatching ? 'emerald' : undefined,
				borderRightColor: isUserGoalMatching ? 'emerald' : undefined,
			}}
		>
			<Link className="flex h-full flex-col" to={`/meal/${id}`}>
				<img
					className="h-48 w-full object-cover object-center"
					src={imageUrl}
					alt={title}
				/>
				<div className="flex flex-grow flex-col justify-between p-6">
					<h4 className="mb-2 text-xl font-bold">{title}</h4>

					<p className="mb-2 text-gray-700">{type}</p>
					<div className="mb-4 flex items-center">
						<span className="text-gray-500">
							Каллории: {calories}
						</span>
						<span className="mx-2">&#8226;</span>
						<span className="text-gray-500">
							Диета: {dietCategory}
						</span>
					</div>
					<div className="mt-4">
						<p className="mb-2 text-gray-700">
							Ингредиенты: {displayIngredients} {ellipsis}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between bg-emerald-500 px-6 py-4">
					<span className="font-bold text-white">₽{price}</span>
					<span className="text-gray-200">{goalName}</span>
				</div>
			</Link>

			{roleId !== ROLE.GUEST && (
				<div className="bg-gray-100 p-4">
					<AddToCartButton
						itemId={id}
						itemType="meal"
						className="w-full rounded-full bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
					/>
				</div>
			)}
		</div>
	);
};

MealCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	calories: PropTypes.string.isRequired,
	dietCategory: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
	goal: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	isMarked: PropTypes.bool.isRequired,
	userGoal: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};
