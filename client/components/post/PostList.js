import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';
import faCommentO from '@fortawesome/fontawesome-free-regular/faComment';
import './PostList.css';
import { Link } from 'react-router-dom';
import { 
  Comment, 
  Icon 
} from 'semantic-ui-react'

function PostItem(props) {
  let post = props.post;
  let postMeta = [].concat([post.id], [post.slug]).join('-');
  return <li className="PostList-item" key={post.id}>
            <Link to={`post/${postMeta}`}>
              <ul className="PostList-item-sub">
                <li>
                  <img className="PostList-hero-img" src={post.user.image}/>
                </li>
                <li className="PostList-title">
                  <span className="PostList-title-link">
                    <div style={{color: '#2185d0'}}>
                      [{post.id}] - 
                      {post.is_sticky ? <Icon name='pin'/> : ''}
                      {post.is_locked ? <Icon name='lock'/> : ''}
                      {post.is_private ? <Icon name='privacy'/> : ''}
                      {post.is_reported ? <Icon name='warning circle'/> : ''}
                      {post.title}
                    </div>
                    <div style={{color: '#2185d0'}}>
                      {post.tags.map(tag => tag.name).join(', ')}
                    </div>
                  </span>
                  <span className="PostList-comment" style={{color: '#2185d0'}}>
                    <div style={{textAlign: 'right'}}>
                      {post.unread_count > 0 ? <FontAwesomeIcon className="PostList-comment-icon" icon={faComment} size="1x"/> : <FontAwesomeIcon className="PostList-comment-icon" icon={faCommentO} size="1x"/>}
                      {post.comments_count}
                    </div>
                    <div>
                      Last commented by {post.last_comment_by}
                    </div>
                  </span>
                </li>
              </ul>
            </Link>
          </li>
}




export default class PostList extends Component {
  render() {
    return (
      <ul className="PostList">
        { this.props.posts.map(post => <PostItem key={post.id} post={post}/>) }
      </ul>
    )
  }
}