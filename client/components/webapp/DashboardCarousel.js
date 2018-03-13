import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Slider from 'react-slick';
import { Header, Image } from 'semantic-ui-react';
import Spinner from 'react-spinkit';

function CarouselItems(props) {
  const {todayWorkouts, isFetchingTodayWorouts} = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '50px',
    // autoplay: true
  };
  todayWorkouts.categories.forEach(category => {
    if(category.code_name === 'resistance') {
      category.color = '#fd5699';
    }else if (category.code_name === 'cardio') {
      category.color = '#3ac4a9';
    }else if (category.code_name === 'recovery') {
      category.color = '#4f94fb';
    }
  });
  let renderedComponent = <Spinner name="pacman" color="black"/>

  if (!isFetchingTodayWorouts) {
    renderedComponent = <Slider {...settings}>
                          {todayWorkouts.categories.map(category => 
                            <div key={category.id} style={{backgroundColor: category.color, height: '450px', marginLeft: '20px', borderRadius: '10px'}}>
                              <div style={{verticalAlign: 'middle', lineHeight: '450px', marginLeft: '50px', marginTop: '50px', height: '450px', width: '350px'}}>
                                <Header as='h1' style={{color: 'white'}}>
                                  {category.name}
                                </Header>
                                <div style={{fontSize: '14px', color: 'white'}}>
                                  {renderHTML(category.html_body)}
                                </div>
                              </div>
                            </div>
                          )}
                        </Slider>
  }

  return renderedComponent
}

export default class DashboardCarousel extends Component {
  render() {
    const { todayWorkouts, isFetchingTodayWorouts } = this.props;
    return (
      <div className="dashboardcarousel">
        {todayWorkouts ? <CarouselItems todayWorkouts={todayWorkouts} isFetchingTodayWorouts={isFetchingTodayWorouts}/> : ''}
      </div>
    )
  }
}
