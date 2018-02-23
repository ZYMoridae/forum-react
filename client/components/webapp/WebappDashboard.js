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
    const { todayWorkouts, mealPlans, isFetchingTodayWorouts, isFetchingMealPlans} = this.props;
    return (
      <div className="webappdashboard">
        <DashboardCarousel todayWorkouts={todayWorkouts} isFetchingTodayWorouts={isFetchingTodayWorouts}/>
        <FoodCarousel mealPlans={mealPlans} isFetchingMealPlans={isFetchingMealPlans}/>
      </div>
    )
  }
}
