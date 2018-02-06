/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { updatePosts } from './actions'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';

const loggerMiddleware = createLogger();

let store = createStore(appReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));