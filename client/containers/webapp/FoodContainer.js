import { connect } from 'react-redux';
import { 
  getFoodInfo
} from '../../actions';
import FoodInfo from '../../components/webapp/FoodInfo';

const mapStateToProps = state => {
  return {
    isFetchingFoodInfo: state.FoodReducer.isFetchingFoodInfo,
    foodInfo: state.FoodReducer.foodInfo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getFoodInfo: (foodId) => {
      dispatch(getFoodInfo(foodId))
    }
  }
}

const FoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodInfo);

export default FoodContainer;