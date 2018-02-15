import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'UserReducer',
  storage,
  blacklist: ['formEmail', 'formPassword', 'isLoginModalOpen', 'isFetchingUser', 'isFetchedUser', 'isLoadingSearchResults', 'searchTerm', 'searchResults', 'isLoadingNotifications', 'notifications', 'notificationTotalCount']
}

let initState = {
  isFetchingUser: false,
  isFetchedUser: false,
  info: null,
  formEmail: '',
  formPassword: '',
  isLoginModalOpen: false,
  // searcing posts
  isLoadingSearchResults: false,
  searchTerm: '',
  searchResults: [],
  // notifications
  isLoadingNotifications: false,
  notifications: [],
  notificationTotalCount: 0,
  err: null
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_USER_PENDING':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'FETCHING_USER_REJECTED':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'RECEIVE_USER':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser, info: action.info, isLoginModalOpen: false})
    case 'INPUT_CHANGE':
      return Object.assign({}, state, {[action.name]: action.value})
    case 'LOGIN_MODAL_OPEN':
      return Object.assign({}, state, {isLoginModalOpen: true})
    case 'LOGIN_MODAL_CLOSE':
      return Object.assign({}, state, {isLoginModalOpen: false})
    case 'LOG_OUT':
      return Object.assign({}, state, {info: null})
    case 'FETCHING_SEARCHING_POST_PENDING':
      return Object.assign({}, state, {isLoadingSearchResults: true})
    case 'RECEIVE_SEARCHING_POST':
      let new_status = Object.assign({}, state, {isLoadingSearchResults: false})
      new_status.searchResults = action.notifications;
      return new_status
    case 'FETCHING_SEARCHING_POST_REJECTED':
      return Object.assign({}, state, {err: action.err, isLoadingSearchResults: false})
    case 'FETCHING_NOTIFICATIONS_PENDING':
      return Object.assign({}, state, {isLoadingNotifications: true})
    case 'RECEIVE_NOTIFICATIONS':
      return Object.assign({}, state, {isLoadingNotifications: false, notifications: action.notifications, notificationTotalCount: action.total_count})
    case 'FETCHING_NOTIFICATIONS_REJECTED':
      return Object.assign({}, state, {err: action.err})
    default:
      return state
  }
}

export default persistReducer(authPersistConfig, userReducer)