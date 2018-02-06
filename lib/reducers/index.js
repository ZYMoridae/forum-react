import { combineReducers } from 'redux';
import ForumReducer from './ForumReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';

const appReducer = combineReducers({
  ForumReducer,
  UserReducer,
  PostReducer
});

export default appReducer;