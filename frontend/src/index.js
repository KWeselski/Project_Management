import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import {ThemeProvider} from 'styled-components';

import App from "./components/App";
import { getUsers } from "./components/actions/projectActions";
import authReducer from "./components/reducers/authReducer";
import projectReducer from "./components/reducers/projectReducer";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

store.dispatch(getUsers());

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

const appDiv = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}><App /></ThemeProvider>
  </Provider>,
  appDiv
);
