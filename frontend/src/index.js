import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import authReducer from "./components/reducers/authReducer";
import projectReducer from "./components/reducers/projectReducer";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { getUsers } from "./components/actions/projectActions";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

store.dispatch(getUsers());

const appDiv = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appDiv
);
