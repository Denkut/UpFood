const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
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
  rations: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ration",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
