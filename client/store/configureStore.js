import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['UserReducer', 'PostReducer', 'ForumReducer']
}

const loggerMiddleware = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
let persistor = persistStore(store)

export default () => {
  return { store, persistor }
}