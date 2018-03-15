import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Slider from 'react-slick';
import { 
  Header, 
  Image,
  Progress
} from 'semantic-ui-react';
import Spinner from 'react-spinkit';

function CarouselItems(props) {
  const {todayWorkouts, isFetchingTodayWorouts, isShowSubCategory, workoutCategoryClick, subCategory} = props;

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
    renderedComponent = <div>
                          <Slider {...settings}>
                            {todayWorkouts.categories.map((category, index) => 
                              <div key={category.id} style={{backgroundColor: category.color, height: '450px', marginLeft: '20px', borderRadius: '10px'}}>
                                <a onClick={()=>{workoutCategoryClick(category.id)}}>
                                  <div style={{verticalAlign: 'middle', lineHeight: '450px', marginLeft: '50px', marginTop: '50px', height: '450px', width: '350px'}}>
                                    <Header as='h1' style={{color: 'white'}}>
                                      {category.name} <Progress size="tiny" percent={parseInt(1/todayWorkouts.progress[index].total*100)} indicating />
                                    </Header>
                                    <div style={{fontSize: '14px', color: 'white'}}>
                                      {renderHTML(category.html_body)}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )}
                          </Slider>
                          <div style={{marginTop: '50px'}}>
                            {isShowSubCategory && 
                              <Slider {...settings}>
                                {subCategory.map((category, index) => 
                                  <div key={category.id} style={{backgroundColor: 'black', height: '120px', marginLeft: '20px', borderRadius: '10px'}}>
                                    <a href={`/#/webapp/workout/overview/${category.id}`}>
                                      <div style={{verticalAlign: 'middle', lineHeight: '120px', marginLeft: '50px', marginTop: '50px', height: '120px', width: '350px'}}>
                                        <Header as='h3' style={{color: 'white'}}>
                                          {category.name} - {category.id}
                                        </Header>
                                      </div>
                                    </a>
                                  </div>
                                )}
                              </Slider>
                            }
                          </div>
                        </div>

  }

  return renderedComponent
}

export default class DashboardCarousel extends Component {
  render() {
    const { todayWorkouts, isFetchingTodayWorouts, isShowSubCategory, workoutCategoryClick, subCategory} = this.props;
    return (
      <div className="dashboardcarousel">
        {todayWorkouts && <CarouselItems subCategory={subCategory} isShowSubCategory={isShowSubCategory} workoutCategoryClick={workoutCategoryClick} todayWorkouts={todayWorkouts} isFetchingTodayWorouts={isFetchingTodayWorouts}/>}
      </div>
    )
  }
}
