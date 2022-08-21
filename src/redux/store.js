import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import rootSaga from "./root.saga";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];
//this stores get passed into our provider component in index.js to give access to the
//root main state that we have prepared
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
