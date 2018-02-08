import Zjax from '../utils/zjax';

let nextTodoId = 0;
var zjax = new Zjax();
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

function fetchingPosts() {
  return {
    type: 'FETCHING_POSTS_PENDING',
    isFetching: true,
    isFetched: false
  };
}

function fetchingPostsError(err) {
  return {
    type: 'FETCHING_POSTS_REJECTED',
    isFetching: false,
    isFetched: false,
    err: err
  };
}

function receivePosts(option, json, page_num) {
  return {
    type: 'RECEIVE_POSTS',
    option: option,
    isFetching: false,
    isFetched: true,
    infos: {
      posts: json
    },
    page_num: page_num,
    receivedAt: Date.now()
  };
}

function receiveTags(option, json) {
  return {
    type: 'RECEIVE_TAGS',
    tags: json,
    receivedAt: Date.now()
  };
}

export function resetDashboardStatus() {
  return {
    type: 'RESET_DASHBOARD_STATUS'
  };
}

export const updatePosts = option => {
  return function (dispatch) {
    dispatch(fetchingPosts());
    let page_num = option && option.page_num ? option.page_num : 1;
    // if(option && option.tag_id) {
    //   page_num = 1;
    // }
    zjax.request({
      url: '/api/v1/forum/posts',
      option: {
        method: 'get',
        params: {
          perPage: 20,
          includeBody: true,
          page: page_num,
          order: 'last_time',
          tag_id: option && option.tag_id ? option.tag_id : 1
        }
      },
      successCallback: response => {
        dispatch(receivePosts(option, response.data, page_num + 1));
      },
      failureCallback: err => {
        dispatch(fetchingPostsError(err));
      }
    });
  };
};

export const fetchTags = option => {
  return function (dispatch) {
    zjax.request({
      url: '/api/v1/forum/tags',
      option: {
        method: 'get'
      },
      successCallback: response => {
        dispatch(receiveTags(option, response.data));
      }
    });
  };
};

// -------- User Actions ----------

function receieveUser(option, json) {
  return {
    type: 'RECEIVE_USER',
    option: option,
    isFetchingUser: false,
    isFetchedUser: true,
    info: json,
    receivedAt: Date.now()
  };
}

function fetchingUser(option, json) {
  return {
    type: 'FETCHING_USER_PENDING',
    option: option,
    isFetching: true,
    isFetched: false
  };
}

function fetchingUserError(err) {
  return {
    type: 'FETCHING_USER_PENDING',
    isFetching: false,
    isFetched: true
  };
}

export const fetchUserInfo = option => {
  return function (dispatch) {
    dispatch(fetchingUser());
    zjax.request({
      url: '/api/v7/user',
      option: {
        method: 'get'
      },
      successCallback: response => {
        dispatch(receieveUser(option, response.data));
      },
      failureCallback: err => {
        dispatch(fetchingUserError(err));
      }
    });
  };
};

// ----------- Post Actions -----------

function receievePost(option, json) {
  return {
    type: 'RECEIVE_POST',
    option: option,
    isFetching: false,
    isFetched: true,
    info: json,
    receivedAt: Date.now()
  };
}

function fetchingPost(option, json) {
  return {
    type: 'FETCHING_POST_PENDING',
    option: option,
    isFetching: true,
    isFetched: false
  };
}

function fetchingPostError(err) {
  return {
    type: 'FETCHING_POST_REJECTED',
    isFetching: false,
    isFetched: true
  };
}

export const fetchPostInfo = option => {
  return function (dispatch) {
    dispatch(fetchingPost());
    zjax.request({
      url: `/api/v1/forum/posts/${option.id}`,
      option: {
        method: 'get'
      },
      successCallback: response => {
        dispatch(receievePost(option, response.data));
      },
      failureCallback: err => {
        dispatch(fetchingPostError(err));
      }
    });
  };
};

function receievePostComments(option, json, hasMoreComments) {
  return {
    type: 'RECEIVE_POST_COMMENTS',
    option: option,
    isFetchingPostComments: false,
    isFetchedPostComments: true,
    hasMoreComments: hasMoreComments,
    info: json,
    receivedAt: Date.now()
  };
}

function fetchingPostComments(option, json) {
  return {
    type: 'FETCHING_POST_COMMENTS_PENDING',
    option: option,
    isFetchingPostComments: true,
    isFetchedPostComments: false
  };
}

function fetchingPostCommentsError(err) {
  return {
    type: 'FETCHING_POST_COMMENTS_REJECTED',
    isFetchingPostComments: false,
    isFetchedPostComments: true
  };
}

export const fetchPostComments = option => {
  return function (dispatch) {
    if (option && option.hasMoreComments) {
      dispatch(fetchingPostComments());
      zjax.request({
        url: `/api/v1/forum/posts/${option.id}/comments`,
        option: {
          method: 'get',
          params: Object.assign({}, {
            per_page: 20
          }, option && option.lastCommentId ? { last_comment_id: option.lastCommentId } : {})
        },
        successCallback: response => {
          let hasMoreComments = response.headers.has_more === 'true' ? true : false;
          dispatch(receievePostComments(option, response.data, hasMoreComments));
        },
        failureCallback: err => {
          dispatch(fetchingPostCommentsError(err));
        }
      });
    }
  };
};

function followPost(option, json) {
  return {
    type: 'FOLLOW_POST',
    id: option.id,
    isFollow: option.isFollow,
    time: Date.now()
  };
}

function unfollowPost(option, json) {
  return {
    type: 'UNFOLLOW_POST',
    id: option.id,
    isFollow: option.isFollow,
    time: Date.now()
  };
}

export const followPostAction = option => {
  return function (dispatch) {
    zjax.request({
      url: `/api/v1/forum/posts/${option.id}/follow`,
      option: {
        method: option.isFollow ? 'post' : 'delete'
      },
      successCallback: response => {
        if (option.isFollow) {
          dispatch(followPost(option, response.data));
        } else {
          dispatch(unfollowPost(option, response.data));
        }
      }
    });
  };
};