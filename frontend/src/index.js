import App from './components/App'
import React from 'react';
import ReactDOM from 'react-dom'
import authReducer from './components/reducers/authReducer';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({auth: authReducer,})
const store = createStore(rootReducer,composeEnhances(applyMiddleware(thunk)))

const appDiv = document.getElementById("app");
ReactDOM.render(<Provider store={store}><App/></Provider>, appDiv);