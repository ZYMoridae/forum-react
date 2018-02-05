import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment'
import './PostList.css';
import { Link } from 'react-router-dom';

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
                  <span className="PostList-title-link">{post.title}</span>
                  <span className="PostList-comment" >
                    <FontAwesomeIcon className="PostList-comment-icon" icon={faComment} size="xs"/>
                    {post.comments_count}
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