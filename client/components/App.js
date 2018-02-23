import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import GlobalHeader from './GlobalHeader';
import MyDashboard from '../containers/MyDashboard';
import GlobalHeaderContainer from '../containers/GlobalHeaderContainer';
import PostContainer from '../containers/PostContainer';
import SettingContainer from '../containers/SettingContainer';
import WebappDashboardContainer from '../containers/webapp/WebappDashboardContainer';
// import axios from 'axios';
import Zjax from '../utils/zjax';

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
      <Route path="/webapp" component={WebappDashboardPage}/>
      <Route path="/setting" component={SettingPage}/>
      <Route path="/post/:id" component={Post}/>
    </div>
  </Router>
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
