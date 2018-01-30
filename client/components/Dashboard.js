import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, updatePosts, fetchTags} from '../actions';
import SecondNavigator from './post/SecondNavigator';
import PostList from './post/PostList';
import Zjax from '../utils/zjax';
import PropTypes from 'prop-types';
import './Dashboard.css';

class Dashboard extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		requestParams: {
	// 			perPage: props.perPage || 20,
	// 			includeBody: props.includeBody || true,
	// 			page: 1,
	// 			order: props.order || 'last_time'
	// 		}
	// 	};
	// 	this.zjax = new Zjax();

	// }
	componentDidMount() {
		this.props.dispatch(updatePosts());
		this.props.dispatch(fetchTags());
	}
  render() {
  	const {infos, onTodoClick, isFetching} = this.props;
  	if(!isFetching) {
	    return (
	      <div className="Dashboard">
	      	<SecondNavigator onClick={this.props.onTodoClick}></SecondNavigator>
	      	<PostList posts={infos.posts}></PostList>
	      	<a className="LoadMore-btn">Load More</a>
	      </div>
	    )  		
  	}
  	return <div>Loading</div>
  }
}

// const Dashboard = ({infos}) => (
//  	<div className="dashboard">
//     <PostList posts={infos && infos.posts ? infos.posts : []}></PostList>
//   </div>
// );

// Dashboard.propTypes = {
// 	infos: PropTypes.shape({
// 		posts: PropTypes.array
// 	})
// }

export default Dashboard;
