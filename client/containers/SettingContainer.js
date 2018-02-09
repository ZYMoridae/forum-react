import { connect } from 'react-redux';
import { followPostAction } from '../actions';
import Setting from '../components/Setting';

const mapStateToProps = state => {
  return {
    userInfo: state.UserReducer.info,
    userCardInfo: state.SettingReducer.userCardInfo,
    isFetchedUserCardInfo: state.SettingReducer.isFetchedUserCardInfo,
    isFetchingUserCardInfo: state.SettingReducer.isFetchingUserCardInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const SettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

export default SettingContainer;