import React from 'react';

export const MealItem = ({
	item,
	handleUpdateQuantity,
	handleRemoveItem,
	isLoading,
}) => {
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
				<div className="flex items-center">
					<button
						onClick={() =>
							handleUpdateQuantity(item.id, item.count - 1)
						}
						disabled={item.count <= 1}
						className="text-gray-500 hover:text-emerald-500 focus:outline-none"
					>
						-
					</button>
					<span className="mx-2">{item.count}</span>
					<button
						onClick={() =>
							handleUpdateQuantity(item.id, item.count + 1)
						}
						className="text-emerald-500 hover:text-emerald-700 focus:outline-none"
					>
						+
					</button>
				</div>
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
