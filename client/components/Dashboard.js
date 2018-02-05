import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, updatePosts, fetchTags, resetDashboardStatus} from '../actions';
import SecondNavigator from './post/SecondNavigator';
import PostList from './post/PostList';
import Zjax from '../utils/zjax';
import PropTypes from 'prop-types';
import './Dashboard.css';

function Loading(props) {
  return props.isFetching ? <div>Loading</div> : ''
}

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
    console.log('##################123123123')
    this.props.dispatch(resetDashboardStatus());
		this.props.dispatch(updatePosts());
		this.props.dispatch(fetchTags());

    window.addEventListener('scroll', this.loadMorePosts.bind(this));
	}
  loadMorePosts() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if(windowBottom >= docHeight && !this.props.isFetching) {
      this.props.dispatch(updatePosts({
        page_num: this.props.page_num
      }));
    }
  }

  render() {
  	const {infos, onTodoClick, isFetching} = this.props;
  	// if(!isFetching) {
	  //   return (
	  //     <div className="Dashboard">
	  //     	<SecondNavigator onClick={this.props.onTodoClick}></SecondNavigator>
	  //     	<PostList posts={infos.posts}></PostList>
	  //     	<a className="LoadMore-btn">Load More</a>
	  //     </div>
	  //   )  		
  	// }
    //<a className="LoadMore-btn">Load More</a> 
    return (
      <div className="Dashboard">
        <SecondNavigator onClick={this.props.onTodoClick}></SecondNavigator>
        <PostList posts={infos.posts}></PostList>
        <Loading isFetching={isFetching}/>
      </div>
    ) 
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
