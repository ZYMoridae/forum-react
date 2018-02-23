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
    case 'LIKE_COMMENT_SUCCESS':
      var newComments = state.postComments.slice();
      newComments.forEach(item => {
        if(item.id === action.id) {
          item.liked_by_user = !action.isLiked;
        }
        item.replied_comments.forEach(nested_item => {
          if(nested_item.id === action.id) {
            nested_item.liked_by_user = !action.isLiked;
          }
        });
      });
      return Object.assign({}, state, {postComments: newComments})
    case 'MARK_POST_READ_SUCCESS':
      return state
    case 'MARK_POST_READ_FAILURE':
      return state
    default:
      return state
  }
}

export default persistReducer(postPersistConfig, postReducer)