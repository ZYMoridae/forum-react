import { connect } from 'react-redux';
import { updatePosts, inputOnChange, fbLoginCallback, loginModalOpen, loginModalClose, logOut, accountLogin, searchTermChange } from '../actions';
import GlobalHeader from '../components/GlobalHeader';

const mapStateToProps = state => {
  return {
    info: state.UserReducer.info,
    isFetchingUser: state.UserReducer.isFetchingUser,
    isFetchedUser: state.UserReducer.isFetchedUser,
    formEmail: state.UserReducer.formEmail,
    formPassword: state.UserReducer.formPassword,
    isLoginModalOpen: state.UserReducer.isLoginModalOpen,
    isLoadingNotification: state.UserReducer.isLoadingNotification,
    searchTerm: state.UserReducer.searchTerm,
    searchResults: state.UserReducer.searchResults
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    formInputOnChange: (e, {name, value}) => {
      dispatch(inputOnChange(name, value));
    },
    accountLogin: (event, data, formData) => {
      dispatch(accountLogin(formData));
    },
    fbLoginCallback: (response) => {
      dispatch(fbLoginCallback(response));
    },
    loginModalOpen: () => {
      dispatch(loginModalOpen());
    },
    loginModalClose: () => {
      dispatch(loginModalClose());
    },
    logOut: () => {
      dispatch(logOut());
    },
    searchTermChange: (searchTerm) => {
      dispatch(searchTermChange(searchTerm));
    }
  }
}

const GlobalHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalHeader);

export default GlobalHeaderContainer;