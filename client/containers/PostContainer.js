import { connect } from 'react-redux';
import { toggleTodo, updatePosts } from '../actions';
import Post from '../components/post/Post';

const mapStateToProps = state => {
  console.log(state)
  return {
    info: state.PostReducer.info,
    isFetchingPost: state.PostReducer.isFetchingPost,
    isFetchedPost: state.PostReducer.isFetchedPost
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