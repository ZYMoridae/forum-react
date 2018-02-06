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

import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    var zjax = new Zjax();
    zjax.request({
      url: '/api/v7/user',
      option: {
        method: 'get'
      },
      successCallback: function (response) {
        console.log(response);
      }
    });
    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(
        'header',
        { className: 'App-header' },
        React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo' }),
        React.createElement(
          'h1',
          { className: 'App-title' },
          'Welcome to React'
        )
      ),
      React.createElement(
        'p',
        { className: 'App-intro' },
        'To get started, edit ',
        React.createElement(
          'code',
          null,
          'src/App.js'
        ),
        ' and save to reload.'
      )
    );
  }
}

const BasicExample = () => React.createElement(
  Router,
  null,
  React.createElement(
    'div',
    null,
    React.createElement(GlobalHeaderContainer, null),
    React.createElement(Route, { exact: true, path: '/', component: Home }),
    React.createElement(Route, { path: '/post/:id', component: Post })
  )
);

const Post = ({ match }) => React.createElement(
  'div',
  { className: 'Container' },
  React.createElement(PostContainer, { postId: match.params.id })
);

const Home = () => React.createElement(
  'div',
  { className: 'Container' },
  React.createElement(MyDashboard, null)
);

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

const Topic = ({ match }) => React.createElement(
  'div',
  null,
  React.createElement(
    'h3',
    null,
    match.params.topicId
  )
);

export default BasicExample;

// export default App;