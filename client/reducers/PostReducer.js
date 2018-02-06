let initState = {
  isFetchingPost: false,
  isFetchedPost: false,
  info: null,
  commentPagNumber: 1,
  postComments: [],
  hasMoreComments: true
}
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_POST_PENDING':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST,
        isFetchingPOST: action.isFetchingPOST
      })
    case 'FETCHING_POST_REJECTED':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST,
        isFetchingPOST: action.isFetchingPOST
      })
    case 'RECEIVE_POST':
      return Object.assign({}, state, {
        isFetchedPOST: action.isFetchedPOST, 
        isFetchingPOST: action.isFetchingPOST, 
        info: action.info
      })
    case 'FETCHING_POST_COMMENTS_PENDING':
      return Object.assign({}, state, {
        isFetchedPostComments: action.isFetchedPostComments,
        isFetchingPostComments: action.isFetchingPostComments
      })
    case 'FETCHING_POST_COMMENTS_REJECTED':
      return Object.assign({}, state, {
        isFetchedPostComments: action.isFetchedPostComments, 
        isFetchingPostComments: action.isFetchingPostComments
      })
    case 'RECEIVE_POST_COMMENTS':
      console.log(action.info)
      return Object.assign({}, state, {
        postComments: [].concat(state.postComments, action.info),
        isFetchedPostComments: action.isFetchedPostComments,
        isFetchingPostComments: action.isFetchingPostComments,
        hasMoreComments: action.hasMoreComments
      })
    default:
      return state
  }
}

export default postReducer