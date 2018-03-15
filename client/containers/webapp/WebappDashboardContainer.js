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
  createPost,
  workoutCategoryClick
} from '../../actions';
import WebappDashboard from '../../components/webapp/WebappDashboard';

const mapStateToProps = state => {
  return {
    subCategory: state.WebappDashboardReducer.subCategory,
    isShowSubCategory: state.WebappDashboardReducer.isShowSubCategory,
    isFetchingTodayWorouts: state.WebappDashboardReducer.isFetchingTodayWorouts,
    todayWorkouts: state.WebappDashboardReducer.todayWorkouts,
    isFetchingMealPlans: state.WebappDashboardReducer.isFetchingMealPlans,
    mealPlans: state.WebappDashboardReducer.mealPlans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    workoutCategoryClick: (categoryId) => {
      dispatch(workoutCategoryClick(categoryId));
    }
  }
}

const WebappDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WebappDashboard);

export default WebappDashboardContainer;