let initState = {
  isFetchingUser: false,
  isFetchedUser: false,
  info: null
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_USER_PENDING':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'FETCHING_USER_REJECTED':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'RECEIVE_USER':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser, info: action.info})
    default:
      return state
  }
}

export default userReducer