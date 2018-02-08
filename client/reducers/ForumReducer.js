import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const forumPersistConfig = {
  key: 'ForumReducer',
  storage,
  blacklist: ['infos']
}

let initState = {
  isFetching: false,
  isFetched: false,
  infos: {
    posts: []
  },
  tags: [],
  page_num: 1,
  selectTagId: 1
}
const forumReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state
    case 'FETCHING_POSTS_PENDING':
      return Object.assign({}, state, {isFetching: action.isFetching, isFetched: action.isFetched})
    case 'FETCHING_POSTS_REJECTED':
      return Object.assign({}, state, {isFetching: action.isFetching, isFetched: action.isFetched, err: err})
    case 'RECEIVE_POSTS':
      if(action.option && action.option.tag_id && action.page_num === 2) {
        return Object.assign({}, state, {selectTagId: action.tag_id, isFetching: action.isFetching, page_num: action.page_num, isFetched: action.isFetched, infos: {posts: [].concat(action.infos.posts)}})
      }
      return Object.assign({}, state, {selectTagId: action.tag_id, isFetching: action.isFetching, page_num: action.page_num, isFetched: action.isFetched, infos: {posts: [].concat(state.infos.posts, action.infos.posts)}})
    case 'RECEIVE_TAGS':
      return Object.assign({}, state, {tags: action.tags, page_num: 1})
    case 'RESET_DASHBOARD_STATUS':
      return {
        isFetching: false,
        isFetched: false,
        infos: {
          posts: []
        },
        tags: [],
        page_num: 1
      }
    default:
      return state
  }
}

export default persistReducer(forumPersistConfig, forumReducer)