import { connect } from 'react-redux';
import { toggleTodo, updatePosts } from '../actions';
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
  console.log('mydashboard', state);
  return {
    todos: Object.assign({}, state),
    infos: Object.assign({}, state.ForumReducer.infos)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onTodoClick: id => {
      dispatch(updatePosts({tag_id: id}));
    }
  }
}

const MyDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default MyDashboard;