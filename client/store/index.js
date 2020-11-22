import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import clients from "./clients";

const store = createStore(
	combineReducers({ clients }),
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default store;
