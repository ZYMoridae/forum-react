import React, { Component } from 'react';
import { 
  updatePosts, 
  fetchTags 
} from '../actions';
import SecondNavigator from './post/SecondNavigator';
import PostList from './post/PostList';
import Zjax from '../utils/zjax';
import './Dashboard.sass';
import Spinner from 'react-spinkit';

function Loading(props) {
  return props.isFetching ? <div className="Dashboard-spinner"><Spinner name="pacman" color="black"/></div> : ''
}

class Dashboard extends Component {
	componentDidMount() {
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
        page_num: this.props.page_num,
        tag_id: this.props.selectTagId
      }));
    }
  }

  render() {
  	const {infos, onClick, isFetching, selectTagId, userInfo, tags, tagInfos, tagClick} = this.props;
    return (
      <div className="Dashboard">
        <SecondNavigator {...this.props}></SecondNavigator>
        <PostList posts={infos.posts}></PostList>
        <Loading isFetching={isFetching}/>
      </div>
    ) 
  }
}

export default Dashboard;
