export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItems = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);
  if (existingCartItems) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [{ ...cartItemToAdd, quantity: 1 }, ...cartItems];
};
export const removeItemFromCart = (cartItems, cartItemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
};

export const removeItem = (cartItems, cartItemToRemove) => {
  if (cartItemToRemove.quantity > 1) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
    });
  }
  return removeItemFromCart(cartItems, cartItemToRemove);
};
