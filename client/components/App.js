import React, { Component } from 'react';
import logo from './logo.svg';
import './App.sass';
import Dashboard from './Dashboard';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import MyDashboard from '../containers/MyDashboard';
import GlobalHeaderContainer from '../containers/GlobalHeaderContainer';
import PostContainer from '../containers/PostContainer';
import SettingContainer from '../containers/SettingContainer';
import WebappDashboardContainer from '../containers/webapp/WebappDashboardContainer';
import FoodContainer from '../containers/webapp/FoodContainer';
import WorkoutOverviewContainer from '../containers/webapp/WorkoutOverviewContainer';
// import axios from 'axios';
import Zjax from '../utils/zjax';
import "../../node_modules/video-react/dist/video-react.css";

import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const BasicExample = () => (
  <Router>
    <div>
      <GlobalHeaderContainer />
      <Route exact path="/" component={Home}/>
      <Route exact path="/webapp" component={WebappDashboardPage}/>
      <Route path="/webapp/food/:id" component={FoodPage}/>
      <Route path="/webapp/workout/overview/:id" component={WorkoutOverviewPage}/>
      <Route path="/setting" component={SettingPage}/>
      <Route path="/post/:id" component={Post}/>
      <GlobalFooter />
    </div>
  </Router>
)


const WorkoutOverviewPage = ({ match }) => (
  <div className="Container">
    <WorkoutOverviewContainer workoutId={match.params.id}/>
  </div>
)


const SettingPage = () => (
  <div className="Container">
    <SettingContainer />
  </div>
) 


const WebappDashboardPage = () => (
  <div className="Container">
    <WebappDashboardContainer />
  </div>
)


const FoodPage = ({ match }) => (
  <div className="Container">
    <FoodContainer foodId={match.params.id}/>
  </div>
)

const Post = ({ match }) => (
  <div className="Container">
    <PostContainer postId={match.params.id}/>
  </div>
)


const Home = () => (
  <div className="Container">    
    <MyDashboard />
  </div>
)


const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample;


// export default App;
