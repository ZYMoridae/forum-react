import React, { Component } from 'react';
import Slider from 'react-slick';
import { Image, List, Header} from 'semantic-ui-react';
import './FoodCarousel.sass';

function DailyPlanItem(props) {
  const {id, image, name} = props;
  return  <List.Item className="dailyplan-item">
            <a href={'/#/webapp/food/'+id}>
              <ul>
                <li>
                  <Image className='foodItem' size='small' circular src={image} />
                </li>
                <li className='foodName'>
                  {name}
                </li>
              </ul>
            </a>
          </List.Item>
}

export default class FoodCarousel extends Component {
  render() {
    const { mealPlans } = this.props;
    var settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="FoodCarousel">
        <Header className="meal-header">Meal Plans</Header>
        {mealPlans && 
          <Slider {...settings}>
            {mealPlans.map(dailyPlan => 
              <div className="dailyplan-container" key={dailyPlan.id}>
                <List horizontal>
                  <DailyPlanItem id={dailyPlan.breakfast_id} image={dailyPlan.breakfast_image} name={dailyPlan.breakfast_name}/>
                  <DailyPlanItem id={dailyPlan.morning_snack_id} image={dailyPlan.morning_snack_image} name={dailyPlan.morning_snack_name}/>
                  <DailyPlanItem id={dailyPlan.lunch_id} image={dailyPlan.lunch_image} name={dailyPlan.lunch_name}/>
                  <DailyPlanItem id={dailyPlan.afternoon_snack_id} image={dailyPlan.afternoon_snack_image} name={dailyPlan.afternoon_snack_name}/>
                  <DailyPlanItem id={dailyPlan.dinner_id} image={dailyPlan.dinner_image} name={dailyPlan.dinner_name}/>
                </List>
              </div>
            )}
          </Slider>
        }
      </div>
    )
  }
}
