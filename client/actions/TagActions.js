import Zjax from '../utils/zjax';
import ActionTypes from './ActionTypes';

var zjax = new Zjax();
export const receiveTags = (option, json) => {
  return {
    type: ActionTypes.RECEIVE_TAGS,
    tags: json,
    receivedAt: Date.now()
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