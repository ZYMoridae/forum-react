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
import CryptoJS from 'crypto-js';

const { persistor, store } = configureStore();
const appsecretProof = CryptoJS.HmacSHA256('EAAJLoYH0ttgBAGO3uj6pql8yBVQ206KBCgJBjuLsZCttITaTvK1MblUA23Up0XGkASlRyg6NLxp77lq4tLZCAmOcdsZCvokRfGHMeWw52KGmmAtSrO4w6xwKUVuheVNcUHLy2TAv2orDVQBIhMcbpzZARkNDZCXCUZCGhDlC07lAZDZD', '0c08b666c5838f07ee56bb4e26fbf6bc').toString(CryptoJS.enc.Hex);

console.log(appsecretProof);
ReactDOM.render(  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>, 
  document.getElementById('root'));