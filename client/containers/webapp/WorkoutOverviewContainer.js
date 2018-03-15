import { connect } from 'react-redux';
import { 
  getWorkoutContents
} from '../../actions';
import WorkoutOverview from '../../components/webapp/WorkoutOverview';

const mapStateToProps = state => {
  return {
    workoutContents: state.WorkoutOverviewReducer.workoutContents,
    isFetchingWorkoutContents: state.WorkoutOverviewReducer.isFetchingWorkoutContents,
    err: state.WorkoutOverviewReducer.isFetchingWorkoutContents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getWorkoutContents: (workoutId) => {
      dispatch(getWorkoutContents(workoutId));
    }
  }
}

const WorkoutOverviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutOverview);

export default WorkoutOverviewContainer;