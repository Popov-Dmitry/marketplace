import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {watchAll} from "./redux/sagas";

const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
    applyMiddleware(
        saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

saga.run(watchAll);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root')
);
