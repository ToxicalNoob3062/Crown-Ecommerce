import { combineReducers } from "redux";
import shopReducer from './shop/shop.reducer';
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import { persistReducer } from "redux-persist";
import directoryReducer from './directory/directory.reducer'
import storage from "redux-persist/lib/storage";
//combine reducers is a function that takes a big object of reducers and combine
//them
const rootReducer= combineReducers({
  user: userReducer,
  shop:shopReducer,
  cart: cartReducer,
  directory:directoryReducer
});
//using localstorage by help of redux persist
const persistConfig={
  key:'root',
  storage,
  whitelist:['cart']
}

export default persistReducer(persistConfig,rootReducer)