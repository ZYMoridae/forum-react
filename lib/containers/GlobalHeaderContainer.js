import { connect } from 'react-redux';
import { toggleTodo, updatePosts } from '../actions';
import GlobalHeader from '../components/GlobalHeader';

const mapStateToProps = state => {
  return {
    info: state.UserReducer.info,
    isFetchingUser: state.UserReducer.isFetchingUser,
    isFetchedUser: state.UserReducer.isFetchedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const GlobalHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);

export default GlobalHeaderContainer;