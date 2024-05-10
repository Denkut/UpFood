const mongoose = require("mongoose");
const validator = require("validator");

const MealSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid url",
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    diet: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        type: Number,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;
