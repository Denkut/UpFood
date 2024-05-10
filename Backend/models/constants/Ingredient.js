const mongoose = require("mongoose");

const IngredientSchema = mongoose.Schema({
  ingredient: [
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
