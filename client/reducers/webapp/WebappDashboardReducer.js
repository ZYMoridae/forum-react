import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'WebappDashboardReducer',
  storage,
  blacklist: ['isFetchingTodayWorouts', 'todayWorkouts', 'err', 'isFetchingMealPlans', 'mealPlans']
}

let initState = {
  isFetchingTodayWorouts: false,
  isFetchingMealPlans: false,
  todayWorkouts: null,
  mealPlans: null,
  err: null
}
const webappDasboardReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TODAY_WORKOUTS_PENDING':
      return Object.assign({}, state, {isFetchingTodayWorouts: true})
    case 'TODAY_WORKOUTS_SUCCESS':
      return Object.assign({}, state, {isFetchingTodayWorouts: false, todayWorkouts: action.todayWorkouts})
    case 'TODAY_WORKOUTS_FAILURE':
      return Object.assign({}, state, {isFetchingTodayWorouts: false, err: action.err})
    case 'FOODS_PENDING':
      return Object.assign({}, state, {isFetchingMealPlans: true})
    case 'FETCH_FOODS_SUCCESS':
      return Object.assign({}, state, {isFetchingMealPlans: false, mealPlans: action.foods})
    case 'FETCH_FOODS_FAILURE':
      return Object.assign({}, state, {isFetchingMealPlans: false, err: action.err})
    default:
      return state
  }
}

export default persistReducer(authPersistConfig, webappDasboardReducer)