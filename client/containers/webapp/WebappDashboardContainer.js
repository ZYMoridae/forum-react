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
} from '../../actions';
import WebappDashboard from '../../components/webapp/WebappDashboard';

const mapStateToProps = state => {
  return {
    isFetchingTodayWorouts: state.WebappDashboardReducer.isFetchingTodayWorouts,
    todayWorkouts: state.WebappDashboardReducer.todayWorkouts,
    isFetchingMealPlans: state.WebappDashboardReducer.isFetchingMealPlans,
    mealPlans: state.WebappDashboardReducer.mealPlans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const WebappDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WebappDashboard);

export default WebappDashboardContainer;