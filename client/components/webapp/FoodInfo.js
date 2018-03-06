import React, { Component } from 'react';
import { 
  Image,
  Header,
  Segment,
  Step,
  Divider,
  Container
} from 'semantic-ui-react';

const AlternativesBlock = (props) => {
  const {alternatives} = props;
  return alternatives.map((alternative, index) => 
        <span key={index}>
          {alternative.body}
        </span>
      )
}


const FoodInfoBlock = (props) => {
  const {foodInfo} = props;
  return (
    <div>
      <Container textAlign='center'>
        <Image src={foodInfo.image} size='big' circular style={{width: '400px', height: '400px'}} centered/>
        <Header>
          {foodInfo.name}
        </Header>
        <Divider section/>
        <Container style={{width: '500px'}}>
          <Header textAlign='center'>
            Directions
          </Header>
          <Step.Group vertical fluid size="large">
            {foodInfo.directions.map((direction, index) => 
              <Step key={index}>
                <Step.Content>
                  <Step.Description>{direction.body}</Step.Description>
                </Step.Content>
              </Step>
            )}
          </Step.Group>
          <Header textAlign='center'>
            Ingredients
          </Header> 
          <Step.Group vertical fluid size="large">
            {foodInfo.ingredients.map((ingredient, index) => 
              <Step key={index}>
                <Step.Content>
                  <Step.Description>
                    {ingredient.body}
                    {ingredient.alternatives.length > 0 ? <AlternativesBlock alternatives={ingredient.alternatives}/>: ''}
                  </Step.Description>
                </Step.Content>
              </Step>
            )}
          </Step.Group>
        </Container>
        
      </Container>
    </div>
  )
}

export default class FoodInfo extends Component {
  componentDidMount() {
    const {foodId, getFoodInfo} = this.props;
    getFoodInfo(foodId);
  }
  render() {
    const {foodInfo} = this.props;
    return (
      <div className="foodinfo">
        {foodInfo ? <FoodInfoBlock foodInfo={foodInfo}/> : ''}
      </div>
    )
  }
}
