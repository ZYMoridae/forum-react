import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'UserReducer',
  storage,
  blacklist: ['formEmail', 'formPassword', 'isLoginModalOpen', 'isFetchingUser', 'isFetchedUser']
}

let initState = {
  isFetchingUser: false,
  isFetchedUser: false,
  info: null,
  formEmail: '',
  formPassword: '',
  isLoginModalOpen: false,
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
    default:
      return state
  }
}

export default persistReducer(authPersistConfig, userReducer)