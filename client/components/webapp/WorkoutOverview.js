import React, { Component } from 'react';
import { 
  Header,
  Container,
  Button
} from 'semantic-ui-react';
import { Player } from 'video-react';
import './WorkoutOverview.sass';

export default class WorkoutOverview extends Component {
  componentDidMount() {
    this.props.getWorkoutContents(this.props.workoutId);
  }
  render() {
    const { workoutContents, isFetchingWorkoutContents, err } = this.props;
    console.log(workoutContents)
    return (
      <div className="WorkoutOverview">
        {workoutContents && 
          <div>
            {workoutContents.circuits.map((circuit, index) => 
              <div key={circuit.id}>
                <Header className="workout-header" as='h3' textAlign='center'>
                  {index+1}. {circuit.circuit_type && circuit.circuit_type.name ? circuit.circuit_type.name : workoutContents.category_name}
                </Header>
                <Container textAlign='center'>
                  {
                    circuit.exercises.map((exercise, index2) => 
                      <div key={exercise.id}>
                        <div>{index2+1}. {exercise.name}</div>
                        <video src={exercise.video} width="320" height="240" autoplay="true" loop preload="auto">
                          <source src={exercise.video} type="video/mp4"/>
                        </video>
                      </div>
                    )
                  }
                </Container>
              </div>
            )}
            <Button color="twitter" fluid className="start-btn">Start Workout</Button>
          </div>
        }
      </div>
    )
  }
}
