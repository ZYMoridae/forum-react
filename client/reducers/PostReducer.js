import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const postPersistConfig = {
  key: 'PostReducer',
  storage,
  blacklist: ['postComments', 'hasMoreComments', 'commentPagNumber', 'info', 'isFollowPost']
}

let initState = {
  isFetchingPost: false,
  isFetchedPost: false,
  info: null,
  commentPagNumber: 1,
  postComments: [],
  hasMoreComments: true,
  isFollowPost: false
}
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_POST_PENDING':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST,
        isFetchingPOST: action.isFetchingPOST
      })
    case 'FETCHING_POST_REJECTED':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST,
        isFetchingPOST: action.isFetchingPOST
      })
    case 'RECEIVE_POST':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST, 
        isFetchingPOST: action.isFetchingPOST, 
        info: action.info,
        isFollowPost: action.info.follow.follow
      })
    case 'FETCHING_POST_COMMENTS_PENDING':
      return Object.assign({}, state, {
        isFetchedPostComments: action.isFetchedPostComments,
        isFetchingPostComments: action.isFetchingPostComments
      })
    case 'FETCHING_POST_COMMENTS_REJECTED':
      return Object.assign({}, state, {
        isFetchedPostComments: action.isFetchedPostComments, 
        isFetchingPostComments: action.isFetchingPostComments
      })
    case 'RECEIVE_POST_COMMENTS':
      return Object.assign({}, state, {
        postComments: [].concat(state.postComments, action.info),
        isFetchedPostComments: action.isFetchedPostComments,
        isFetchingPostComments: action.isFetchingPostComments,
        hasMoreComments: action.hasMoreComments
      })
    case 'FOLLOW_POST':
      return Object.assign({}, state, {
        isFollowPost: true
      })
    case 'UNFOLLOW_POST':
      return Object.assign({}, state, {
        isFollowPost: false
      })      
    default:
      return state
  }
}

export default persistReducer(postPersistConfig, postReducer)