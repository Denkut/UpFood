const Cart = require("../models/Cart");
const User = require("../models/User");

//add
async function addToCart(userId, products) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    for (const product of products) {
      const { productId, productType, quantity } = product;

      if (productType !== "meal" && productType !== "ration") {
        throw new Error("Invalid product type");
      }

      const existingProduct = user.cart[productType + "s"].find(
        (item) => item.id.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart[productType + "s"].push({ id: productId, quantity });
      }
    }

    await user.save();

    const populatedUser = await User.populate(user, {
      path: "cart.rations.id",
      populate: {
        path: "meals.id",
      },
    });
    const populatedCart = await User.populate(populatedUser, {
      path: "cart.meals.id",
    });

    return populatedCart.cart;
  } catch (error) {
    throw error;
  }
}

//remove
async function removeFromCart(userId, productId) {
  try {
    const user = await User.findById(userId);
    if (!user || !user.cart) {
      throw new Error("User or cart not found");
    }

    const cart = user.cart;

    cart.meals = cart.meals.filter((meal) => meal.id.toString() !== productId);
    cart.rations = cart.rations.filter(
      (ration) => ration.id.toString() !== productId
    );

    const populatedCartWithRations = await User.populate(user, {
      path: "cart.rations.id",
      populate: {
        path: "meals.id",
      },
    });
    const populatedCart = await User.populate(populatedCartWithRations, {
      path: "cart.meals.id",
    });

    await user.save();

    return populatedCart.cart;
  } catch (error) {
    throw error;
  }
}

async function getCart(userId) {
  try {
    const user = await User.findById(userId);
    if (!user || !user.cart) {
      throw new Error("User or cart not found");
    }
    const populatedCartWithRations = await User.populate(user, {
      path: "cart.rations.id",
      populate: {
        path: "meals.id",
      },
    });
    const populatedCart = await User.populate(populatedCartWithRations, {
      path: "cart.meals.id",
    });

    return populatedCart.cart;
  } catch (error) {
    throw error;
  }
}

//updateQuantity
async function updateQuantity(userId, itemId, newQuantity) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    let updatedItem = null;

    for (const meal of user.cart.meals) {
      if (meal.id.toString() === itemId) {
        meal.quantity = newQuantity;
        updatedItem = meal;
        break;
      }
    }
    if (!updatedItem) {
      for (const ration of user.cart.rations) {
        if (ration.id.toString() === itemId) {
          ration.quantity = newQuantity;
          updatedItem = ration;
          break;
        }
      }
    }

    if (!updatedItem) {
      throw new Error("Товар не найден");
    }

    await user.save();

    const populatedCartWithRations = await User.populate(user, {
      path: "cart.rations.id",
      populate: {
        path: "meals.id",
      },
    });
    const populatedCart = await User.populate(populatedCartWithRations, {
      path: "cart.meals.id",
    });

    return populatedCart.cart;;
  } catch (error) {
    throw new Error("Не удалось обновить количество товара в корзине");
  }
}

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
};
