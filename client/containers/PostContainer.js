import { connect } from 'react-redux';
import { toggleTodo, updatePosts } from '../actions';
import Post from '../components/post/Post';

const mapStateToProps = state => {
  return {
    info: state.PostReducer.info,
    isFetchingPost: state.PostReducer.isFetchingPost,
    isFetchedPost: state.PostReducer.isFetchedPost,
    hasMoreComments: state.PostReducer.hasMoreComments,
    postComments: state.PostReducer.postComments,
    isFetchedPostComments: state.PostReducer.isFetchedPostComments,
    isFetchingPostComments: state.PostReducer.isFetchingPostComments,
    userInfo: state.UserReducer.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostContainer;