import React from 'react';
import PropTypes from 'prop-types';
import { UpdateQuantityButton } from '../../../components';
import { PROP_TYPE } from '../../../constants';

export const MealItem = ({ item, handleRemoveItem, isLoading, quantity }) => {
	return (
		<div key={item.id} className="mb-4 flex items-center">
			<img
				src={item.imageUrl}
				alt={item.title}
				className="mr-4 h-16 w-16 rounded object-cover"
			/>
			<div className="flex-1">
				<p className="text-lg font-bold">{item.title}</p>
			</div>
			<div className="flex items-center space-x-4">
				<p className="text-lg font-bold">{item.price} ₽</p>
				<UpdateQuantityButton
					itemId={item.id}
					quantity={quantity}
					itemType="meal"
					className="text-gray-500 hover:text-emerald-500 focus:outline-none"
				/>
				<button
					type="submit"
					disabled={isLoading}
					onClick={() => handleRemoveItem(item.id, 'meal')}
					className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
				>
					{isLoading ? 'Отправка...' : 'Удалить'}
				</button>
			</div>
		</div>
	);
};

MealItem.propTypes = {
	item: PROP_TYPE.ITEM,
	handleRemoveItem: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	quantity: PropTypes.number.isRequired,
};
