const mapCart = require("./mapCart");

module.exports = function (user) {
  return {
    id: user._id,
    login: user.login,
    roleId: user.role,
    session: user.session,
    fullName: user.fullName,
    weight: user.weight,
    goal: user.goal,
    height: user.height,
    age: user.age,
    email: user.email,
    diet: user.diet,
    allergenicIngredients: user.allergenicIngredients,
    registeredAt: user.createdAt,

    cart: user.cart ? mapCart(user.cart) : null,
  };
};
