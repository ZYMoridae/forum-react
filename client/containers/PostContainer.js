import { connect } from 'react-redux';
import { followPostAction } from '../actions';
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
    userInfo: state.UserReducer.info,
    isFollowPost: state.PostReducer.isFollowPost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onFollowClick: (id, isFollow) => {
      dispatch(followPostAction({id: id, isFollow: isFollow}));
    }
  }
}

const PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostContainer;