const Meal = require("../models/Meal");

//add
async function addMeal(meal) {
  const newMeal = await Meal.create(meal);

  return newMeal;
}

//edit
async function editMeal(id, meal) {
  const newMeal = await Meal.findByIdAndUpdate(id, meal, {
    returnDocument: "after",
  });

  return newMeal;
}

//delete
function deleteMeal(id) {
  return Meal.deleteOne({ _id: id });
}

//get list with search and pagination
async function getMeals(search = "", limit = 10, page = 1) {
  const [meals, count] = await Promise.all([
    Meal.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Meal.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    meals,
    lastPage: Math.ceil(count / limit),
  };
}

//get item
function getMeal(id) {
  return Meal.findById(id);
}

module.exports = {
  addMeal,
  editMeal,
  deleteMeal,
  getMeals,
  getMeal,
};
