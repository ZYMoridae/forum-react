import { connect } from 'react-redux';
import { toggleTodo, updatePosts, inputOnChange } from '../actions';
import GlobalHeader from '../components/GlobalHeader';

const mapStateToProps = state => {
  return {
    info: state.UserReducer.info,
    isFetchingUser: state.UserReducer.isFetchingUser,
    isFetchedUser: state.UserReducer.isFetchedUser,
    formEmail: state.UserReducer.formEmail,
    formPassword: state.UserReducer.formPassword
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    formInputOnChange: (e, {name, value}) => {
      console.log(e.target.value, name, value);
      dispatch(inputOnChange(name, value));
    }
  }
}

const GlobalHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalHeader);

export default GlobalHeaderContainer;