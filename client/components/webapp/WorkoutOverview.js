import React, { Component } from 'react';
import { 
  Header,
  Container,
  Button
} from 'semantic-ui-react';
import { Player } from 'video-react';

export default class WorkoutOverview extends Component {
  componentDidMount() {
    this.props.getWorkoutContents(this.props.workoutId);
  }
  render() {
    const { workoutContents, isFetchingWorkoutContents, err } = this.props;
    return (
      <div className="workoutoverview">
        {workoutContents && 
          <div>
            {workoutContents.circuits.map((circuit, index) => 
              <div key={circuit.id}>
                <Header as='h3' textAlign='center' style={{backgroundColor: '#fd5699', paddingTop: '20px', paddingBottom: '20px', color: 'white'}}>
                  {index+1}. {circuit.circuit_type.name}
                </Header>
                <Container textAlign='center'>
                  {circuit.sub_circuits.map((sub_circuit, index1) => 
                    sub_circuit.exercises.map((exercise, index2) => 
                      <div key={exercise.id}>
                        <div>{index2+1}. {exercise.name}</div>
                        <video src={exercise.video} width="320" height="240" autoplay="true" loop preload="auto">
                          <source src={exercise.video} type="video/mp4"/>
                        </video>
                      </div>
                    )
                  )}
                </Container>
                
              </div>
            )}
            <Button color="twitter" fluid style={{paddingTop: '30px', paddingBottom: '30px'}}>Start Workout</Button>
          </div>
        }
      </div>
    )
  }
}
