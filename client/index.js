/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import appReducer from './reducers';
import 'semantic-ui-css/semantic.min.css';
import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, 
  document.getElementById('root'));