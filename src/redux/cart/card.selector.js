import { createSelector } from "reselect";


//when you will use map to state props use selectors and if your map to state props properties are needed
//to be changes then change it with a function here in selector file!
const selectCart = (state) => state.cart;
export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);
export const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accum, cartItem) => accum + cartItem.quantity, 0)
);
export const selectCartTotal = createSelector([selectCartItems],cartItems=>cartItems.reduce((accum,cartItem)=>{
  return accum+(cartItem.quantity*cartItem.price)
},0));
