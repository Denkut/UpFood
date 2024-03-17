import { Link } from 'react-router-dom';
import { ingredients as allIngredients } from '../../../bff/constants';
import { AddToCartButton } from '../../../components';

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
}) => {
	const displayIngredients = ingredients.slice(0, 2).map((id, index) => (
		<span key={id}>
			{allIngredients.find(item => item.id === id)?.name}
			{index !== 1 && ', '}
		</span>
	));

	const ellipsis = ingredients.length > 2 ? <span>...</span> : null;

	return (
		<div className="mx-auto flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl">
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
					<span className="text-gray-200">{goal}</span>
				</div>
			</Link>

			<div className="bg-gray-100 p-4">
				<AddToCartButton
					itemId={id}
					itemType="meal"
					className="w-full rounded-full bg-emerald-800 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
				/>
			</div>
		</div>
	);
};
