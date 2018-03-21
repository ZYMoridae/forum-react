import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import Slider from 'react-slick';
import { 
  Header, 
  Image,
  Progress
} from 'semantic-ui-react';
import Spinner from 'react-spinkit';
import './DashboardCarousel.sass';

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
    }else if (category.code_name === 'challenge'){
      category.color = '#fd906a';
    }else {
      category.color = '#fd5699';
    }
  });
  let renderedComponent = <Spinner name="pacman" color="black"/>


  if (!isFetchingTodayWorouts) {
    renderedComponent = <div>
                          <Slider {...settings}>
                            {todayWorkouts.categories.map((category, index) => 
                              <div key={category.id} className="category-block" style={{backgroundColor: category.color}}>
                                <a onClick={()=>{workoutCategoryClick(category.id)}}>
                                  <div className='category-block-container'>
                                    <Header as='h1' className='category-header'>
                                      {category.name} <Progress size="tiny" percent={parseInt(1/todayWorkouts.progress[index].total*100)} indicating />
                                    </Header>
                                    <div className='category-body'>
                                      {renderHTML(category.html_body)}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            )}
                          </Slider>
                          <div className="subcategory-list-container">
                            {isShowSubCategory && 
                              <Slider {...settings}>
                                {subCategory.map((category, index) => 
                                  <div className="subcategory-block" key={category.id}>
                                    <a href={`/#/webapp/workout/overview/${category.id}`}>
                                      <div className="subcategory-block-container">
                                        <Header as='h3' className="subcategory-header">
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
      <div className="DashboardCarousel">
        {todayWorkouts && <CarouselItems subCategory={subCategory} isShowSubCategory={isShowSubCategory} workoutCategoryClick={workoutCategoryClick} todayWorkouts={todayWorkouts} isFetchingTodayWorouts={isFetchingTodayWorouts}/>}
      </div>
    )
  }
}
