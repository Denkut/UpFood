module.exports = function (cart) {
  return {
    id: cart._id,
    meals: (cart.meals || []).map((meal) => ({
      id: meal.id._id,
      title: meal.id.title,
      imageUrl: meal.id.image,
      quantity: meal.quantity,
      type: meal.id.type,
      calories: meal.id.calories,
      goal: meal.id.goal,
      diet: meal.id.diet,
      ingredients: meal.id.ingredients,
      price: meal.id.price,
    })),
    rations: cart.rations.map((ration) => ({
      id: ration.id._id,
      title: ration.id.title,
      imageUrl: ration.id.image,
      meals: (ration.id.meals || []).map((meal) => ({
        id: meal.id._id,
        quantity: meal.quantity,
        title: meal.id.title,
        imageUrl: meal.id.image,
        type: meal.id.type,
        calories: meal.id.calories,
        goal: meal.id.goal,
        diet: meal.id.diet,
        ingredients: meal.id.ingredients,
        price: meal.id.price,
      })),
      publishedAt: ration.id.publishedAt,
      quantity: ration.quantity,
    })),
  };
};
