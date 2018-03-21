import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

var zjax = new Zjax();

// Search post


export const fetchingSearchPost = () => {
  return {
    type: ActionTypes.FETCHING_SEARCHING_POST_PENDING
  }
}

export const receieveSearchingPost = (json) => {
  return {
    type: ActionTypes.RECEIVE_SEARCHING_POST,
    notifications: json
  }
}

export const fetchingSearchPostError = (err) => {
  return {
    type: ActionTypes.FETCHING_SEARCHING_POST_REJECTED,
    err: err
  }
}

export const searchTermChange = (searchTerm) => {
  return function (dispatch) {
    dispatch(fetchingSearchPost());
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
        dispatch(receieveSearchingPost(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingSearchPostError(err))
      }
    })    
  }
}