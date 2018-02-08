import { connect } from 'react-redux';
import { updatePosts } from '../actions';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
  return {
    infos: state.ForumReducer.infos,
    isFetching: state.ForumReducer.isFetching,
    page_num: state.ForumReducer.page_num,
    selectTagId: state.ForumReducer.selectTagId,
    userInfo: state.UserReducer.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onTodoClick: (event, data) => {
      dispatch(updatePosts({tag_id: data.value}));
    }
  }
}

const MyDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default MyDashboard;