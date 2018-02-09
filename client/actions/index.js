import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

let nextTodoId = 0;
var zjax = new Zjax();
export const addTodo = text => {
  return {
    type: ActionTypes.ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: ActionTypes.SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: ActionTypes.TOGGLE_TODO,
    id
  }
}

function fetchingPosts() {
  return {
    type: ActionTypes.FETCHING_POSTS_PENDING,
    isFetching: true,
    isFetched: false
  }
}

function fetchingPostsError(err) {
  return {
    type: ActionsTypes.FETCHING_POSTS_REJECTED,
    isFetching: false,
    isFetched: false,
    err: err
  }
}


function receivePosts(option, json, page_num) {
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


function receiveTags(option, json) {
  return {
    type: ActionTypes.RECEIVE_TAGS,
    tags: json,
    receivedAt: Date.now()
  }
}

export const updatePosts = (option) => {
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
      successCallback: (response) => {
        dispatch(receivePosts(option, response.data, page_num + 1));
      },
      failureCallback: (err) => {
        dispatch(fetchingPostsError(err));
      }
    });
  }
}

export const fetchTags = (option) => {
  return function (dispatch) {
    zjax.request({
      url: '/api/v1/forum/tags',
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(receiveTags(option, response.data));
      }
    })
  }
}


// -------- User Actions ----------

function receieveUser(json) {
  return {
    type: ActionTypes.RECEIVE_USER,
    isFetchingUser: false,
    isFetchedUser: true,
    info: json,
    receivedAt: Date.now()
  }
}

function fetchingUser(option, json) {
  return {
    type: ActionTypes.FETCHING_USER_PENDING,
    option: option,
    isFetchingUser: true,
    isFetchedUser: false
  }
}

function fetchingUserError(err) {
  return {
    type: ActionTypes.FETCHING_USER_REJECTED,
    isFetchedUser: false,
    isFetchedUser: true
  }
}


export const fetchUserInfo = (option) => {
  return function (dispatch) {
    dispatch(fetchingUser());
    zjax.request({
      url: '/api/v7/user',
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(receieveUser(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingUserError(err));
      }
    });
  }
}

export const inputOnChange = (name, value) => {
  return {
    type: ActionTypes.INPUT_CHANGE,
    name: name,
    value: value
  }
}


// Login

export const accountLogin = (formData) => {
  return function (dispatch) {
    dispatch(fetchingUser());
    zjax.request({
      url: '/api/v5/email/signup',
      option: {
        method: 'post',
        params: {
          email: formData.formEmail,
          password: formData.formPassword
        }
      },
      successCallback: (response) => {
        dispatch(receieveUser(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingUserError(err));
      }
    })
  }


  return {
    type: ActionTypes.SUBMIT_FORM
  }
}


export const logOut = () => {
  return {
    type: ActionTypes.LOG_OUT
  }
}


export const loginModalOpen = () => {
  return {
    type: ActionTypes.LOGIN_MODAL_OPEN
  }
}

export const loginModalClose = () => {
  return {
    type: ActionTypes.LOGIN_MODAL_CLOSE
  }
}

export const fbLoginCallback = (authResponse) => {
  return function (dispatch) {
    dispatch(fetchingUser());
    zjax.request({
      url: '/api/v2/facebook/login',
      option: {
        method: 'post',
        params: {
          facebook_token: authResponse.accessToken
        }
      },
      successCallback: (response) => {
        dispatch(receieveUser(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingUserError(err))
      }
    })
  }
}

// Notification


function fetchingNotification() {
  return {
    type: 'FETCHING_NOTIFICATION_PENDING'
  }
}

function receieveNotification(json) {
  return {
    type: 'RECEIVE_NOTIFICATION',
    notifications: json
  }
}

function fetchingNotificationError(err) {
  return {
    type: 'FETCHING_NOTIFICATION_REJECTED',
    err: err
  }
}

export const searchTermChange = (searchTerm) => {
  return function (dispatch) {
    dispatch(fetchingNotification());
    zjax.request({
      url: '/api/v1/forum/posts',
      option: {
        method: 'get',
        params: {
          per_page: 5,
          search_term: searchTerm
        }
      },
      successCallback: (response) => {
        response.data = response.data.map(notification => {
          return {
            id: notification.id,
            title: notification.title,
            description: notification.user.username,
            image: notification.user.image,
            slug: notification.slug
          }
        });
        dispatch(receieveNotification(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingNotificationError(err))
      }
    })    
  }
}


// ----------- Post Actions -----------

function receievePost(option, json) {
  return {
    type: ActionTypes.RECEIVE_POST,
    option: option,
    isFetching: false,
    isFetched: true,
    info: json,
    receivedAt: Date.now()
  }
}


function fetchingPost(option, json) {
  return {
    type: ActionTypes.FETCHING_POST_PENDING,
    option: option,
    isFetching: true,
    isFetched: false    
  }
}

function fetchingPostError(err) {
  return {
    type: ActionTypes.FETCHING_POST_REJECTED,
    isFetching: false,
    isFetched: true
  }
}

export const fetchPostInfo = (option) => {
  return function (dispatch) {
    dispatch(fetchingPost());
    zjax.request({
      url: `/api/v1/forum/posts/${option.id}`,
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(receievePost(option, response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingPostError(err));
      }
    });
  }  
}


function receievePostComments(option, json, hasMoreComments) {
  return {
    type: ActionTypes.RECEIVE_POST_COMMENTS,
    option: option,
    isFetchingPostComments: false,
    isFetchedPostComments: true,
    hasMoreComments: hasMoreComments,
    info: json,
    receivedAt: Date.now()
  }
}


function fetchingPostComments(option, json) {
  return {
    type: ActionTypes.FETCHING_POST_COMMENTS_PENDING,
    option: option,
    isFetchingPostComments: true,
    isFetchedPostComments: false    
  }
}


function fetchingPostCommentsError(err) {
  return {
    type: ActionTypes.FETCHING_POST_COMMENTS_REJECTED,
    isFetchingPostComments: false,
    isFetchedPostComments: true
  }
}


export const fetchPostComments = (option) => {
  return function (dispatch) {
    if(option && option.hasMoreComments) {
      dispatch(fetchingPostComments());
      zjax.request({  
        url: `/api/v1/forum/posts/${option.id}/comments`,
        option: {
          method: 'get',
          params: Object.assign({}, {
            per_page: 20
          }, option && option.lastCommentId ? {last_comment_id: option.lastCommentId} : {})
        },
        successCallback: (response) => {
          let hasMoreComments = response.headers.has_more === 'true' ? true : false;
          dispatch(receievePostComments(option, response.data, hasMoreComments));
        },
        failureCallback: (err) => {
          dispatch(fetchingPostCommentsError(err));
        }
      });      
    }
  }
}


function followPost(option, json) {
  return {
    type: ActionTypes.FOLLOW_POST,
    id: option.id,
    isFollow: option.isFollow,
    time: Date.now()    
  }
}


function unfollowPost(option, json) {
  return {
    type: ActionTypes.UNFOLLOW_POST,
    id: option.id,
    isFollow: option.isFollow,
    time: Date.now()    
  }
}


export const followPostAction = (option) => {
  return function(dispatch) {
    zjax.request({
      url: `/api/v1/forum/posts/${option.id}/follow`,
      option: {
        method: option.isFollow ? 'post' : 'delete'
      },
      successCallback: (response) => {
        if(option.isFollow) {
          dispatch(followPost(option, response.data));
        }else {
          dispatch(unfollowPost(option, response.data))
        }
      }
    })
  }
}


// ---------  Setting -------

function fetchingUserCardInfo() {
  return {
    type: 'FETCHING_USER_CARD_INFO_PENDING',
    isFetchingUserCardInfo: true,
    isFetchedUserCardInfo: false
  }
}

function receieveUserCardInfo(json) {
  return {
    type: 'RECEIVE_USER_CARD_INFO',
    userCardInfo: json,
    isFetchingUserCardInfo: false,
    isFetchedUserCardInfo: true
  }
}

function fetchingUserCardInfoError(err) {
  return {
    type: 'FETCHING_USER_CARD_INFO_REJECTED',
    err: err,
    isFetchingUserCardInfo: false,
    isFetchedUserCardInfo: true
  }
}


export const fetchUserCardInfo = (username) => {
  return function(dispatch) {
    dispatch(fetchingUserCardInfo());
    zjax.request({
      url: `/api/v1/forum/users/${username}`,
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(receieveUserCardInfo(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingUserCardInfoError(err));
      }
    })
  }
}
