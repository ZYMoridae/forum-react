import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const forumPersistConfig = {
  key: 'ForumReducer',
  storage,
  blacklist: ['infos', 'tagInfos', 'isImageModalOpen', 'postImages', 'postTitle', 'postBody']
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
  tagInfos: [],
  isImageModalOpen: false,
  postImages: [],
  postTitle: '',
  postBody: '',
  newPostPending: false
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
      return Object.assign({}, state, {tagInfos: newTagInfos})
    case 'OPEN_IMAGE_MODAL':
      return Object.assign({}, state, {isImageModalOpen: true})
    case 'CLOSE_IMAGE_MODAL':
      return Object.assign({}, state, {isImageModalOpen: false})
    case 'ADD_IMAGE':
      var newImages = state.postImages.slice();
      if(action.image) {
        newImages.push(action.image);
      }
      return Object.assign({}, state, {postImages: newImages})
    case 'DELETE_IMAGE':
      var newImages = state.postImages.slice();
      if(action.image) {
        newImages = newImages.filter(item => item === action.image.key);
      }
      return Object.assign({}, state, {postImages: newImages})
    case 'POST_TITLE_CHANGED':
      return Object.assign({}, state, {postTitle: action.title})
    case 'POST_BODY_CHANGED':
      return Object.assign({}, state, {postBody: action.body})
    case 'NEW_POST_PENDING':
      return Object.assign({}, state, {newPostPending: true})
    case 'NEW_POST_SUCCESS':
      return Object.assign({}, state, {newPostPending: false, tagInfos: [], postImages: [], postTitle: '', postBody: ''})
    case 'NEW_POST_FAILURE':
      return Object.assign({}, state, {newPostPending: false})
    default:
      return state
  }
}

export default persistReducer(forumPersistConfig, forumReducer)