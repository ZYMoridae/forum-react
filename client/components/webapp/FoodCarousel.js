import React, { Component } from 'react';
import Slider from 'react-slick';
import { Image, List, Header} from 'semantic-ui-react';
import './FoodCarousel.css';

export default class FoodCarousel extends Component {
  render() {
    const { mealPlans } = this.props;
    var settings = {
      dots: true,
      // infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
      // autoplay: true
    };
    return (
      <div className="FoodCarousel" style={{marginTop: '100px'}}>
        <Header style={{textAlign: 'center'}}>Meal Plans</Header>
        {mealPlans ? <Slider {...settings}>
          {mealPlans.map(dailyPlan => 
            <div key={dailyPlan.id} style={{textAlign: 'center'}}>
              <List horizontal>
                <List.Item style={{textAlign: '-webkit-center'}}>
                  <a href={'/#/webapp/food/'+dailyPlan.breakfast_id}>
                    <ul style={{listStyle: 'none'}}>
                      <li>
                        <Image className='foodItem' size='small' circular src={dailyPlan.breakfast_image} />
                      </li>
                      <li className='foodName'>
                        {dailyPlan.breakfast_name}
                      </li>
                    </ul>
                  </a>
                </List.Item>
                <List.Item style={{textAlign: '-webkit-center'}}>
                  <a>
                    <ul style={{listStyle: 'none'}}>
                      <li>
                        <Image className='foodItem' size='small' circular src={dailyPlan.morning_snack_image} />
                      </li>
                      <li className='foodName'>
                        {dailyPlan.morning_snack_name}
                      </li>
                    </ul>
                  </a>
                </List.Item>
                <List.Item style={{textAlign: '-webkit-center'}}>
                  <a>
                    <ul style={{listStyle: 'none'}}>
                      <li>
                        <Image className='foodItem' size='small' circular src={dailyPlan.lunch_image} />
                      </li>
                      <li className='foodName'>
                        {dailyPlan.lunch_name}
                      </li>
                    </ul>
                  </a>
                </List.Item>
                <List.Item style={{textAlign: '-webkit-center'}}>
                  <a>
                    <ul style={{listStyle: 'none'}}>
                      <li>
                        <Image className='foodItem' size='small' circular src={dailyPlan.afternoon_snack_image} />
                      </li>
                      <li className='foodName'>
                        {dailyPlan.afternoon_snack_name}
                      </li>
                    </ul>
                  </a>
                </List.Item>
                <List.Item style={{textAlign: '-webkit-center'}}>
                  <a>
                    <ul style={{listStyle: 'none'}}>
                      <li>
                        <Image className='foodItem' size='small' circular src={dailyPlan.dinner_image} />
                      </li>
                      <li className='foodName'>
                        {dailyPlan.dinner_name}
                      </li>
                    </ul>
                  </a>
                </List.Item>
              </List>
            </div>
          )}
        </Slider> : ''}
      </div>
    )
  }
}
