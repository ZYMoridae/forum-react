import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'FoodReducer',
  storage,
  blacklist: ['isFetchingFoodInfo', 'foodInfo', 'err']
}

let initState = {
  isFetchingFoodInfo: false,
  foodInfo: null,
  err: null
}
const foodReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FOOD_INFO_PENDING':
      return Object.assign({}, state, {isFetchingFoodInfo: true})
    case 'FETCH_FOOD_INFO_SUCCESS':
      return Object.assign({}, state, {foodInfo: action.foodInfo, isFetchingFoodInfo: false})
    case 'FETCH_FOOD_INFO_FAILURE':
      return Object.assign({}, state, {err: action.err, isFetchingFoodInfo: false})
    default:
      return state
  }
}

export default persistReducer(authPersistConfig, foodReducer)