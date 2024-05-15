export const filterAllergenicRations = (rations, userAllergies) => {
  const markedRations = [];
  const unmarkedRations = [];

  userAllergies = userAllergies.map(Number);

  rations.forEach((ration) => {
    if (Array.isArray(ration.meals)) {
      let hasAllergen = false;
      ration.meals.forEach((meal) => {
        if (
          meal.ingredients &&
          Array.isArray(meal.ingredients) &&
          meal.ingredients.some &&
          meal.ingredients.some((id) => userAllergies.includes(id))
        ) {
          hasAllergen = true;
        }
      });

      if (hasAllergen) {
        markedRations.push(ration);
      } else {
        unmarkedRations.push(ration);
      }
    }
  });
  return { markedRations, unmarkedRations };
};
