import { combineReducers } from 'redux';
import ForumReducer from './ForumReducer';
import UserReducer from './UserReducer';

const appReducer = combineReducers({
  ForumReducer,
  UserReducer
});

export default appReducer;