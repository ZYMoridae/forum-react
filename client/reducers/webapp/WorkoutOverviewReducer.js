import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'WorkoutOverviewReducer',
  storage,
  blacklist: ['err', 'workoutContents', 'isFetchingWorkoutContents']
}

let initState = {
  workoutContents: null,
  isFetchingWorkoutContents: false,
  err: null
}
const workoutOverviewReducer = (state = initState, action) => {
  switch (action.type) {
    case 'WORKOUT_CONTENTS_PENDING':
      return Object.assign({}, state, {isFetchingWorkoutContents: true})
    case 'FETCH_WORKOUT_CONTENTS_SUCCESS':
      return Object.assign({}, state, {workoutContents: action.workoutContents, isFetchingWorkoutContents: false})
    case 'FETCH_WORKOUT_CONTENTS_FAILURE':
      return Object.assign({}, state, {err: action.err, isFetchingWorkoutContents: false})
    default:
      return state
  }
}

export default persistReducer(authPersistConfig, workoutOverviewReducer)