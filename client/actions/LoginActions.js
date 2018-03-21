import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';
import {fetchingUser, receieveUser} from './UserActions';

var zjax = new Zjax();

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