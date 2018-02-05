import React, { Component } from 'react';
import { fetchPostInfo } from '../../actions';
import './Post.css';

function PostDetails(props) {
  const postInfo = props.post;
  console.log(postInfo)
  return <div>
          <h3>{postInfo.title}</h3>
          <h5>
            {postInfo.tags.map(tag => <span key={tag.id}>{tag.name}</span>)}
          </h5>
          <div>
            <img className="Post-hero-logo" src={postInfo.user.image}/>
            <span>{postInfo.user.username}</span>
          </div>         
         </div>
}



export default class Post extends Component {
  componentDidMount() {
    const meta_id = this.props.postId.split('-')[0];
    this.props.dispatch(fetchPostInfo({id: meta_id}));
  }
  render() {
    const { isFetchingPost, info } = this.props;
    return (
      <div className="post">
        { info ? <PostDetails post={info}/> : <div>Loading</div> }
      </div>
    )
  }
}
