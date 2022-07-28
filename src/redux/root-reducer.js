import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
//combine reducers is a function that takes a big object of reducers and combine
//them
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
