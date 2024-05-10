module.exports = function (ration) {
  return {
    id: ration._id,
    title: ration.title,
    imageUrl: ration.image,
    goal: ration.goal,
    meals: (ration.meals || []).map((meal) => ({
      id: meal.id ? meal.id._id : null,
      title: meal.id ? meal.id.title : null,
      imageUrl: meal.id ? meal.id.image : null,
      quantity: meal.quantity || null,
      type: meal.id ? meal.id.type : null,
      calories: meal.id ? meal.id.calories : null,
      goal: meal.id ? meal.id.goal : null,
      diet: meal.id ? meal.id.diet : null,
      ingredients: meal.id ? meal.id.ingredients : null,
      price: meal.id ? meal.id.price : null,
    })),
    totalCalories: ration.totalCalories,
    totalPrices: ration.totalPrices,
    content: ration.content,
    publishedAt: ration.createdAt,
  };
};
