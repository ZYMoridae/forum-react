import { connect } from 'react-redux';
import { followPostAction, toggleVisibility } from '../actions';
import Setting from '../components/Setting';

const mapStateToProps = state => {
  return {
    userInfo: state.UserReducer.info,
    userCardInfo: state.SettingReducer.userCardInfo,
    isFetchedUserCardInfo: state.SettingReducer.isFetchedUserCardInfo,
    isFetchingUserCardInfo: state.SettingReducer.isFetchingUserCardInfo,
    visible: state.SettingReducer.visible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    toggleSideBar: (visible) => {
      dispatch(toggleVisibility());
    }
  }
}

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default SettingContainer;