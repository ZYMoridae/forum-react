const forumReducer = (state = [], action) => {
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
      console.log(action)
      return state
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {infos: {posts: action.infos.posts}})
    case 'RECEIVE_TAGS':
      return Object.assign({}, state, {tags: action.tags})
    default:
      return state
  }
}

export default forumReducer