import React, { Component } from 'react';
import PostList from './post/PostList'
import Zjax from '../utils/zjax';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			requestParams: {
				perPage: props.perPage || 20,
				includeBody: props.includeBody || true,
				page: 1,
				order: props.order || 'last_time'
			}
		};
		this.zjax = new Zjax();

	}
	componentDidMount() {
		this.zjax.request({
			url: '/api/v1/forum/posts',
			option: {
				method: 'get',
				params: this.state.requestParams
			},
			successCallback: (response) => {
				this.setState(Object.assign({}, this.state, {posts: response.data}));
			}
		});		
	}
  render() {
  	if(this.state.posts) {
	    return (
	      <div className="dashboard">
	      	<PostList posts={this.state.posts}></PostList>
	      </div>
	    )  		
  	}
  	return <div>Loading</div>
  }
}
