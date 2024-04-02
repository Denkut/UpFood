import PropTypes from 'prop-types';
import { ingredients as allIngredients, goals } from '../../../bff/constants';

export const MealDescription = ({ ingredients, goal, userAllergies }) => {
	const getIngredientNameById = id => {
		const ingredient = allIngredients.find(item => item.id === id);
		return ingredient ? ingredient.name : '';
	};

	const isAllergen = id => {
		const idString = id.toString();
		return userAllergies.includes(idString);
	};

	const goalName =
		goals.find(item => String(item.id) === goal)?.name || 'Цель не указана';

	return (
		<div className="ml-5 items-center">
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Цель:
				</span>
				<span className="mr-2 flex items-center text-lg">
					{goalName}
				</span>
			</div>
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Ингредиенты:
				</span>
				<ul className="mr-2 flex flex-wrap items-center text-lg">
					{ingredients &&
						ingredients.map((id, index) => (
							<li
								key={id}
								className={`mr-2 ${
									isAllergen(id) ? 'text-red-500' : ''
								}`}
							>
								{getIngredientNameById(id)}
								{index !== ingredients.length - 1 && ','}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

MealDescription.propTypes = {
	ingredients: PropTypes.array.isRequired,
	goal: PropTypes.string.isRequired,
	userAllergies: PropTypes.array.isRequired,
};
