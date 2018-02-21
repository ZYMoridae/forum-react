import { connect } from 'react-redux';
import { 
  updatePosts, 
  onTagSelect, 
  openImageModal, 
  closeImageModal, 
  addImage, 
  deleteImage, 
  postTitleChanged, 
  postBodyChanged, 
  createPost
} from '../actions';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
  return {
    infos: state.ForumReducer.infos,
    isFetching: state.ForumReducer.isFetching,
    page_num: state.ForumReducer.page_num,
    selectTagId: state.ForumReducer.selectTagId,
    userInfo: state.UserReducer.info,
    tagInfos: state.ForumReducer.tagInfos,
    isImageModalOpen: state.ForumReducer.isImageModalOpen,
    postImages: state.ForumReducer.postImages,
    postTitle: state.ForumReducer.postTitle,
    postBody: state.ForumReducer.postBody,
    newPostPending: state.ForumReducer.newPostPending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onClick: (event, data) => {
      dispatch(updatePosts({tag_id: data.value}));
    },
    tagClick: (tagInfo) => {
      dispatch(onTagSelect(tagInfo));
    },
    openImageModal: () => {
      dispatch(openImageModal());
    },
    closeImageModal: () => {
      dispatch(closeImageModal());
    },
    addImage: (image) => {
      dispatch(addImage(image));
    },
    deleteImage: (image) => {
      dispatch(deleteImage(image));
    },
    postTitleChanged: (title) => {
      dispatch(postTitleChanged(title));
    },
    postBodyChanged: (body) => {
      dispatch(postBodyChanged(body));
    },
    createPost: (postTitle, postBody, tagInfos, postImages) => {
      dispatch(createPost(postTitle, postBody, tagInfos, postImages));
    }
  }
}

const MyDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default MyDashboard;