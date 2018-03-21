import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

var zjax = new Zjax();
export * from './PostActions';
export * from './TagActions';
export * from './UserActions';
export * from './LoginActions';
export * from './PostSearchActions';

export const inputOnChange = (name, value) => {
  return {
    type: ActionTypes.INPUT_CHANGE,
    name: name,
    value: value
  }
}

// Notifications

function fetchingNotifications() {
  return {
    type: ActionTypes.FETCHING_NOTIFICATIONS_PENDING
  }
}

function receieveNotifications(json, total_count) {
  return {
    type: ActionTypes.RECEIVE_NOTIFICATIONS,
    notifications: json,
    total_count: total_count
  }
}

function fetchingNotificationsError(err) {
  return {
    type: ActionTypes.FETCHING_NOTIFICATIONS_REJECTED,
    err: err
  }
}


export const fetchNotifications = () => {
  return function (dispatch) {
    dispatch(fetchingNotifications());
    zjax.request({
      url: '/api/v1/forum/notifications',
      option: {
        method: 'get',
        params: {
          page: 1,
          per_page: 10
        }
      },
      successCallback: (response) => {
        dispatch(receieveNotifications(response.data, response.headers.total_count));
      },
      failureCallback: (err) => {
        dispatch(fetchingNotificationsError(err));
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
    type: ActionTypes.FETCHING_USER_CARD_INFO_PENDING,
    isFetchingUserCardInfo: true,
    isFetchedUserCardInfo: false
  }
}

function receieveUserCardInfo(json) {
  return {
    type: ActionTypes.RECEIVE_USER_CARD_INFO,
    userCardInfo: json,
    isFetchingUserCardInfo: false,
    isFetchedUserCardInfo: true
  }
}

function fetchingUserCardInfoError(err) {
  return {
    type: ActionTypes.FETCHING_USER_CARD_INFO_REJECTED,
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

export const toggleVisibility = () => {
  return {
    type: ActionTypes.TOGGLE_VISIBILITY
  }
}

// like comment
function likeCommentSuccess(id, isLiked) {
  return {
    type: ActionTypes.LIKE_COMMENT_SUCCESS,
    id: id,
    isLiked: isLiked
  }
}

function likeCommentFailure(err) {
  return {
    type: ActionTypes.LIKE_COMMENT_FAILURE,
    err: err
  }
}

export const likeComment = (id, isLiked) => {
  return function(dispatch) {
    zjax.request({
      url: `/api/v1/forum/comments/${id}/like`,
      option: {
        method: !isLiked ? 'post' : 'delete'
      },
      successCallback: (response) => {
        dispatch(likeCommentSuccess(id, isLiked));
      },
      failureCallback: (err) => {
        dispatch(likeCommentFailure(err));
      }
    });
  }
}


export const onTagSelect = (tagInfo) => {
  return {
    type: ActionTypes.TAG_SELECT,
    tagInfo: tagInfo
  }
}

// --------- Image modal -----

export const openImageModal = () => {
  return {
    type: ActionTypes.OPEN_IMAGE_MODAL
  }
}


export const closeImageModal = () => {
  return {
    type: ActionTypes.CLOSE_IMAGE_MODAL
  }
}

export const addImage = (image) => {
  return {
    type: ActionTypes.ADD_IMAGE,
    image: image
  }
}

export const deleteImage = (image) => {
  return {
    type: ActionTypes.DELETE_IMAGE,
    image: image
  }
}


export const postTitleChanged = (title) => {
  return {
    type: ActionTypes.POST_TITLE_CHANGED,
    title: title
  }
}

export const postBodyChanged = (body) => {
  return {
    type: ActionTypes.POST_BODY_CHANGED,
    body: body
  }
}


// create new post
function newPostPending() {
  return {
    type: ActionTypes.NEW_POST_PENDING
  }
}

function newPostSuccess() {
  return {
    type: ActionTypes.NEW_POST_SUCCESS
  }
}

function newPostFailure() {
  return {
    type: ActionTypes.NEW_POST_FAILURE
  }
}

export const createPost = (postTitle, postBody, tagInfos, postImages) => {
  return function(dispatch) {
    let my_data = new FormData();
    my_data.append('post[title]', postTitle);

    tagInfos.forEach(tag => {
      my_data.append('post[tag_ids][]', tag.id);
    })
    my_data.append('comment[content]', postBody);
    postImages.forEach(postImage => {
      my_data.append('comment[images][]', postImage.file);
    });
    dispatch(newPostPending());
    zjax.request({
      url: '/api/v1/forum/posts',
      option: {
        method: 'post',
        responseType: 'text',
        data: my_data
      },
      successCallback: (response) => {
        dispatch(newPostSuccess());
      },
      failureCallback: (err) => {
        dispatch(newPostFailure());
      }   
    })
  }
}

function markPostReadSuccess() {
  return {
    type: 'MARK_POST_READ_SUCCESS'
  }
}

function markPostReadFailure() {
  return {
    type: 'MARK_POST_READ_FAILURE'
  }
}


export const markPostAsRead = (postId) => {
  return function(dispatch) {
    zjax.request({
      url: `/api/v1/forum/posts/${postId}/read`,
      option: {
        method: 'post'
      },
      successCallback: (response) => {
        dispatch(markPostReadSuccess(postId));
      },
      failureCallback: (err) => {
        dispatch(markPostReadFailure(err));
      }
    })
  }
}

// --------- workouts

function fetchingTodayWorkouts() {
  return {
    type: 'TODAY_WORKOUTS_PENDING'
  }
}

function fetchTodayWorkoutsSuccess(json) {
  return {
    type: 'TODAY_WORKOUTS_SUCCESS',
    todayWorkouts: json
  }
}

function fetchTodayWorkoutFailure(err) {
  return {
    type: 'TODAY_WORKOUTS_FAILURE',
    err: err
  }
}


export const getTodayWorkouts = () => {
  return function(dispatch) {
    dispatch(fetchingTodayWorkouts());
    zjax.request({
      url: '/api/v8/workouts/today',
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(fetchTodayWorkoutsSuccess(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchTodayWorkoutFailure(err));
      }
    })
  }
}


// -------- foods

function fetchingFoods() {
  return {
    type: 'FOODS_PENDING'
  }
}

function fetchFoodsSuccess(json) {
  return {
    type: 'FETCH_FOODS_SUCCESS',
    foods: json
  }
}

function fetchFoodsFailure(err) {
  return {
    type: 'FETCH_FOODS_FAILURE',
    err: err
  }
}

export const getFoods = () => {
  return function (dispatch) {
    dispatch(fetchingFoods());
    zjax.request({
      url: '/api/v8/foods',
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(fetchFoodsSuccess(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchFoodsFailure(err));
      }
    })
  }
}



function fetchingFoodInfo() {
  return {
    type: 'FOOD_INFO_PENDING'
  }
}

function fetchFoodInfoSuccess(json) {
  return {
    type: 'FETCH_FOOD_INFO_SUCCESS',
    foodInfo: json
  }
}

function fetchFoodInfoFailure() {
  return {
    type: 'FETCH_FOOD_INFO_FAILURE',
    err: err
  }
}

export const getFoodInfo = (foodId) => {
  return function (dispatch) {
    dispatch(fetchingFoodInfo());
    zjax.request({
      url: `/api/v8/foods/${foodId}`,
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(fetchFoodInfoSuccess(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchFoodInfoFailure(err));
      }
    })
  }
}


/*
dashboard
 */

export const workoutCategoryClick = (categoryId) => {
  return {
    type: 'WORKOUT_CATEGORY_CLICK',
    categoryId: categoryId
  }
}

/*
workouts overview
 */
function fetchingWorkoutContents() {
  return {
    type: 'WORKOUT_CONTENTS_PENDING'
  }
}

function fetchWorkoutContentsSuccess(json) {
  return {
    type: 'FETCH_WORKOUT_CONTENTS_SUCCESS',
    workoutContents: json
  }
}

function fetchWorkoutContentsFailure() {
  return {
    type: 'FETCH_WORKOUT_CONTENTS_FAILURE',
    err: err
  }
}

export const getWorkoutContents = (workoutContentId) => {
  return function (dispatch) {
    dispatch(fetchingWorkoutContents());
    zjax.request({
      url: `/api/v9/workout-contents/${workoutContentId}`,
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(fetchWorkoutContentsSuccess(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchWorkoutContentsFailure(err));
      }
    })
  }
}