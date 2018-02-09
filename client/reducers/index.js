import { combineReducers } from 'redux';
import ForumReducer from './ForumReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';
import SettingReducer from './SettingReducer';

const appReducer = combineReducers({
  ForumReducer,
  UserReducer,
  PostReducer,
  SettingReducer
});

export default appReducer;