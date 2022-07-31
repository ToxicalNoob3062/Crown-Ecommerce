import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import {persistStore} from "redux-persist"
import rootReducer from "./root-reducer";
const middlewares = [logger];
//this stores get passed into our provider component in index.js to give access to the
//root main state that we have prepared
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor=persistStore(store)

