import React from 'react';
import PropTypes from 'prop-types';
import { UpdateQuantityButton } from '../../../components';

export const RationItem = ({
	ration,
	handleRemoveItem,
	toggleVisibleMeals,
	visibleMeals,
	isLoading,
	mealsData,
	count,
}) => {
	return (
		<div key={ration.id} className="mb-4  items-center">
			<div className="mb-4 flex items-center">
				<img
					onClick={() => toggleVisibleMeals(ration.id)}
					src={ration.imageUrl}
					alt={ration.title}
					className="mr-4 h-24 w-24 cursor-pointer rounded object-cover"
				/>
				<div className="flex-1">
					<p
						onClick={() => toggleVisibleMeals(ration.id)}
						className="cursor-pointer text-lg font-bold hover:text-emerald-700"
					>
						{ration.title}
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<p className="text-lg font-bold">{ration.totalPrice} ₽</p>
					<UpdateQuantityButton
						itemId={ration.id}
						count={count}
						itemType="ration"
						className="text-gray-500 hover:text-emerald-500 focus:outline-none"
					/>
					<button
						type="submit"
						disabled={isLoading}
						onClick={() => handleRemoveItem(ration.id, 'ration')}
						className=" text-red-500 hover:text-red-700 focus:outline-none"
					>
						{isLoading ? 'Отправка...' : 'Удалить рацион'}
					</button>
				</div>
			</div>
			{visibleMeals[ration.id] && (
				<div>
					{ration.meals.map((meal, index) => (
						<div
							key={index}
							className="mb-4 ml-4 flex items-center"
						>
							{meal.items.map((mealItem, mealIndex) => (
								<img
									key={mealIndex}
									src={mealsData[mealItem.mealId].imageUrl}
									alt={`Meal ${mealIndex + 1}`}
									className="mr-4 h-16 w-16 rounded object-cover"
								/>
							))}
							<div className="flex-1">
								<p className="text-lg font-bold">
									{meal.items[0].title}
								</p>
							</div>
							<div className="flex items-center space-x-4">
								<p className="text-lg font-bold">
									{meal.items[0].price} ₽
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

RationItem.propTypes = {
	ration: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	handleRemoveItem: PropTypes.func.isRequired,
	toggleVisibleMeals: PropTypes.func.isRequired,
	visibleMeals: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	mealsData: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
};
