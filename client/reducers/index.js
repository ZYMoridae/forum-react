import { combineReducers } from 'redux';
import ForumReducer from './ForumReducer';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';
import SettingReducer from './SettingReducer';
import WebappDashboardReducer from './webapp/WebappDashboardReducer';

const appReducer = combineReducers({
  ForumReducer,
  UserReducer,
  PostReducer,
  SettingReducer,
  WebappDashboardReducer
});

export default appReducer;