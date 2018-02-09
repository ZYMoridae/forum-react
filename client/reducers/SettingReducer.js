import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const settingPersistConfig = {
  key: 'SettingReducer',
  storage,
  blacklist: ['userCardInfo', 'isFetchedUserCardInfo', 'isFetchingUserCardInfo', 'err']
}

let initState = {
  userCardInfo: null,
  isFetchedUserCardInfo: false,
  isFetchingUserCardInfo: false,
  err: null
}
const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_USER_CARD_INFO_PENDING':
      return Object.assign({}, state, {isFetchedUserCardInfo: action.isFetchedUserCardInfo, isFetchingUserCardInfo: action.isFetchingUserCardInfo})
    case 'FETCHING_USER_CARD_INFO_REJECTED':
      return Object.assign({}, state, {isFetchedUserCardInfo: action.isFetchedUserCardInfo, isFetchingUserCardInfo: action.isFetchingUserCardInfo})
    case 'RECEIVE_USER_CARD_INFO':
      return Object.assign({}, state, {isFetchedUserCardInfo: action.isFetchedUserCardInfo, isFetchingUserCardInfo: action.isFetchingUserCardInfo, userCardInfo: action.userCardInfo})
    default:
      return state
  }
}

export default persistReducer(settingPersistConfig, settingReducer)