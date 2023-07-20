import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import initialState from "./initialState";
import rootReducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(rootReducer, initialState, enhancer);
