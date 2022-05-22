import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from "redux-thunk";
import storeReducer from "./Redux/storeReducer";

export const store = createStore(storeReducer, composeWithDevTools(applyMiddleware(thunk))); //actual store


ReactDOM.render(
    <Provider store={store}>
        <App/>

    </Provider>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

