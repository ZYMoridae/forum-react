let initState = {
  isFetchingPost: false,
  isFetchedPost: false,
  info: null
}
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_POST_PENDING':
      return Object.assign({}, state, {isFetchedPOST: action.isFetchedPOST, isFetchingPOST: action.isFetchingPOST})
    case 'FETCHING_POST_REJECTED':
      return Object.assign({}, state, {isFetchedPOST: action.isFetchedPOST, isFetchingPOST: action.isFetchingPOST})
    case 'RECEIVE_POST':
      return Object.assign({}, state, {isFetchedPOST: action.isFetchedPOST, isFetchingPOST: action.isFetchingPOST, info: action.info})
    default:
      return state
  }
}

export default postReducer