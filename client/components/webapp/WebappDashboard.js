import React, { Component } from 'react';
import DashboardCarousel from './DashboardCarousel';
import FoodCarousel from './FoodCarousel';
import { 
  getTodayWorkouts,
  getFoods
} from '../../actions';

export default class WebappDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(getTodayWorkouts());
    this.props.dispatch(getFoods());
  }
  render() {
    const { todayWorkouts, mealPlans, isFetchingTodayWorouts, isFetchingMealPlans, isShowSubCategory, workoutCategoryClick, subCategory} = this.props;
    return (
      <div className="webappdashboard">
        <DashboardCarousel subCategory={subCategory} todayWorkouts={todayWorkouts} isFetchingTodayWorouts={isFetchingTodayWorouts} isShowSubCategory={isShowSubCategory} workoutCategoryClick={workoutCategoryClick}/>
        <FoodCarousel mealPlans={mealPlans} isFetchingMealPlans={isFetchingMealPlans}/>
      </div>
    )
  }
}
