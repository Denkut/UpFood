const mongoose = require("mongoose");
const validator = require("validator");
const Cart = require("./Cart");

const roles = require("../constants/roles");

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
    session: {
      type: Boolean,
      default: true,
    },
    fullName: {
      type: String,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    goal: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
      unique: true,
    },
    diet: {
      type: Number,
      default: null,
    },
    allergenicIngredients: {
      type: [String],
      default: null,
    },
    cart: {
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
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
