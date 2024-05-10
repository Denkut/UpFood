const mongoose = require("mongoose");
const validator = require("validator");
const Meal = require("./Meal");

const RationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Image should be a valid URL",
      },
    },
    goal: {
      type: Number,
      required: true,
    },
    meals: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meal",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    totalCalories: {
      type: Number,
    },
    totalPrices: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Ration = mongoose.model("Ration", RationSchema);

module.exports = Ration;
