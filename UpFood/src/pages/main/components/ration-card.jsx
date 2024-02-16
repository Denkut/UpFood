import React from 'react';
import { Link } from 'react-router-dom';

export const RationCard = ({
	id,
	title,
	imageUrl,
	type,
	totalCalories,
	goal,
	meals,
	totalPrice,
	content,
}) => {
	const handleAddToCart = () => {
		console.log(`Рацион ${title} добавлен в корзину!`);
	};

	const displayMeals = meals.slice(0, 2).map((meal, index) => (
		<span key={meal.mealId}>
			{meal.title}
			{index !== 1 && ', '}
		</span>
	));

	const ellipsis = meals.length > 2 ? <span>...</span> : null;

	return (
		<div className="mx-auto flex h-full w-96 transform flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
			<Link className="flex h-full flex-col" to={`/ration/${id}`}>
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
							Общие калории: {totalCalories}
						</span>
					</div>
					<div className="mt-4">
						<p className="mb-2 text-gray-700">
							Блюда: {displayMeals} {ellipsis}
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between bg-emerald-500 px-6 py-4">
					<span className="font-bold text-white">₽{totalPrice}</span>
					<span className="text-gray-200">{goal}</span>
				</div>
			</Link>

			<div className="bg-gray-100 p-4">
				<button
					onClick={handleAddToCart}
					className="w-full rounded-full bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
				>
					Добавить в корзину
				</button>
			</div>
		</div>
	);
};