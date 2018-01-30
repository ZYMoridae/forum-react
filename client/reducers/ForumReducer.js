let initState = {
  isFetching: false,
  isFetched: false,
  infos: {
    posts: []
  },
  tags: []
}
const forumReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state
    case 'FETCHING_POSTS_PENDING':
      return Object.assign({}, state, {isFetching: action.isFetching, isFetched: action.isFetched})
    case 'FETCHING_POSTS_REJECTED':
      return Object.assign({}, state, {isFetching: action.isFetching, isFetched: action.isFetched, err: err})
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {isFetching: action.isFetching, isFetched: action.isFetched, infos: {posts: action.infos.posts}})
    case 'RECEIVE_TAGS':
      return Object.assign({}, state, {tags: action.tags})
    default:
      return state
  }
}

export default forumReducer