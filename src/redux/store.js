import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import rootReducer from "./root-reducer";
const middlewares = [logger];
//this stores get passed into our provider component in index.js to give access to the
//root main state that we have prepared
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
