import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

var zjax = new Zjax();

// -------- User Actions ----------
export const receieveUser = (json) => {
  return {
    type: ActionTypes.RECEIVE_USER,
    isFetchingUser: false,
    isFetchedUser: true,
    info: json,
    receivedAt: Date.now()
  }
}

export const fetchingUser = (option, json) => {
  return {
    type: ActionTypes.FETCHING_USER_PENDING,
    option: option,
    isFetchingUser: true,
    isFetchedUser: false
  }
}

export const fetchingUserError = (err) => {
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