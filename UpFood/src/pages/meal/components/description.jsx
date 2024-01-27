export const Description = ({ ingredients, suitableFor }) => {
	return (
		<div className=" ml-5 items-center">
			<div className="flex">
				<span className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Цель:{' '}
				</span>
				<span className="mr-2 flex items-center  text-lg">
					{suitableFor.map((item, id) =>
						id === suitableFor.length - 1 ? item : item + ', ',
					)}
				</span>
			</div>
			<div className="flex">
				<h3 className="mr-2 items-center text-xl font-semibold text-emerald-900">
					Ингредиенты:
				</h3>
				<ul className="mr-2 flex items-center text-lg">
					{ingredients.map((ingredient, id) =>
						id === ingredients.length - 1
							? ingredient
							: ingredient + ', ',
					)}
				</ul>
			</div>
		</div>
	);
};
