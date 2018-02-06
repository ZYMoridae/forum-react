import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import GlobalHeader from './GlobalHeader';
import MyDashboard from '../containers/MyDashboard';
import GlobalHeaderContainer from '../containers/GlobalHeaderContainer';
import PostContainer from '../containers/PostContainer';
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
{/*      <Route path="/about" component={About}/>*/}
      {/*<Route path="/topics" component={Topics}/>*/}
      <Route path="/post/:id" component={Post}/>
    </div>
  </Router>
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

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// )

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample;


// export default App;
