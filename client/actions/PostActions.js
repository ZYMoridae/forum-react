import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

var zjax = new Zjax();
export const fetchingPosts = () => {
  return {
    type: ActionTypes.FETCHING_POSTS_PENDING,
    isFetching: true,
    isFetched: false
  }
}

export const fetchingPostsError = (err) => {
  return {
    type: ActionsTypes.FETCHING_POSTS_REJECTED,
    isFetching: false,
    isFetched: false,
    err: err
  }
}


export const receivePosts = (option, json, page_num) => {
  return {
    type: ActionTypes.RECEIVE_POSTS,
    option: option,
    isFetching: false,
    isFetched: true,
    infos: {
      posts: json
    },
    tag_id: option && option.tag_id ? option.tag_id : 1,
    page_num: page_num,
    receivedAt: Date.now()
  }
}

export const updatePosts = (option) => {
  return function (dispatch) {
    dispatch(fetchingPosts());
    let page_num = option && option.page_num ? option.page_num : 1;
    let params = {
      perPage: 20,
      includeBody: true,
      page: page_num,
      order: 'last_time'
    }
    if (option && option.tag_id) {
      params = Object.assign({}, params, {tag_id: option.tag_id})
    }
    zjax.request({
      url: '/api/v1/forum/posts',
      option: {
        method: 'get',
        params: params
      },
      successCallback: (response) => {
        dispatch(receivePosts(option, response.data, page_num + 1));
      },
      failureCallback: (err) => {
        dispatch(fetchingPostsError(err));
      }
    });
  }
}