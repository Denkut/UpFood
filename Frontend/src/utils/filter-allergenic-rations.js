export const filterAllergenicRations = (rations, userAllergies) => {
  const markedRations = [];
  const unmarkedRations = [];

  rations.forEach((ration) => {
    if (Array.isArray(ration.meals)) {
      let hasAllergen = false;
      ration.meals.forEach((meal) => {
        if (Array.isArray(meal) && meal.some) {
          // Добавленная проверка
          if (
            meal.some((item) =>
              Array.isArray(item.ingredients) && item.ingredients.some
                ? item.ingredients.some((id) =>
                    userAllergies.includes(String(id))
                  )
                : false
            )
          ) {
            hasAllergen = true;
          }
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
