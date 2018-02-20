import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const forumPersistConfig = {
  key: 'ForumReducer',
  storage,
  blacklist: ['infos', 'tagInfos']
}

let initState = {
  isFetching: false,
  isFetched: false,
  infos: {
    posts: []
  },
  tags: [],
  page_num: 1,
  selectTagId: 1,
  tagInfos: []
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
    case 'TAG_SELECT':
      let newTagInfos = state.tagInfos.slice(),
          allTagIds = newTagInfos.map(tag => tag.id),
          tagIndex = allTagIds.indexOf(action.tagInfo.id);
      
      if(tagIndex === -1) {
        newTagInfos.push(action.tagInfo);
      }else {
        newTagInfos = newTagInfos.filter(tag => tag.id !== action.tagInfo.id)
      }
      console.log(newTagInfos)
      return Object.assign({}, state, {tagInfos: newTagInfos})
    default:
      return state
  }
}

export default persistReducer(forumPersistConfig, forumReducer)