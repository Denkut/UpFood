export const getCartItemCount = (userCart) => {
  let total = 0;
  if (userCart) {
    Object.values(userCart).forEach((cartItem) => {
      if (Array.isArray(cartItem)) {
        cartItem.forEach((item) => {
          total += item.quantity;
        });
      } else {
        total += cartItem.quantity;
      }
    });
  }
  return total;
};
