import { combineReducers } from 'redux';
import ForumReducer from './ForumReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';
import SettingReducer from './SettingReducer';
import WebappDashboardReducer from './webapp/WebappDashboardReducer';
import FoodReducer from './webapp/FoodReducer';

const appReducer = combineReducers({
  ForumReducer,
  UserReducer,
  PostReducer,
  SettingReducer,
  WebappDashboardReducer,
  FoodReducer
});

export default appReducer;