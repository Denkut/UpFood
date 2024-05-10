module.exports = function (meal) {
  return {
    id: meal.id,
    title: meal.title,
    imageUrl: meal.image,
    quantity: meal.quantity,
    type: meal.type,
    calories: meal.calories,
    goal: meal.goal,
    diet: meal.diet,
    ingredients: meal.ingredients,
    price: meal.price,
    publishedAt: meal.createdAt,
  };
};
