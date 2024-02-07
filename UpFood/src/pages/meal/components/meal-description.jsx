import { ingredients as allIngredients } from '../../../bff/constants';

export const MealDescription = ({ ingredients, goal }) => {
	const getIngredientNameById = id => {
		const ingredient = allIngredients.find(item => item.id === id);
		return ingredient ? ingredient.name : '';
	};

	return (
		<div className="ml-5 items-center">
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Цель:
				</span>
				<span className="mr-2 flex items-center text-lg">{goal}</span>
			</div>
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Ингредиенты:
				</span>
				<ul className="mr-2 flex items-center text-lg">
					{ingredients &&
						ingredients.map((id, index) => (
							<li key={id} className="mr-2">
								{getIngredientNameById(id)}
								{index !== ingredients.length - 1 && ','}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
