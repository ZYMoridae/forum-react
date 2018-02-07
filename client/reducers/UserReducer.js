let initState = {
  isFetchingUser: false,
  isFetchedUser: false,
  info: null,
  formEmail: '',
  formPassword: ''
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_USER_PENDING':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'FETCHING_USER_REJECTED':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser})
    case 'RECEIVE_USER':
      return Object.assign({}, state, {isFetchedUser: action.isFetchedUser, isFetchingUser: action.isFetchingUser, info: action.info})
    case 'INPUT_CHANGE':
      return Object.assign({}, state, {[action.name]: action.value})
    default:
      return state
  }
}

export default userReducer