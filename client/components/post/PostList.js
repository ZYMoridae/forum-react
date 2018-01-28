import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment'
import './PostList.css';

export default class PostList extends Component {
  render() {
    return (
      <ul className="PostList">
        { this.props.posts.map(post => 
        	<li className="PostList-item" key={post.id}>
            <ul className="PostList-item-sub">
              <li>
                <img className="PostList-hero-img" src={post.user.image}/>
              </li>
              <li className="PostList-title">
                <a className="PostList-title-link">{post.title}</a>
                <span className="PostList-comment" >
                  <FontAwesomeIcon className="PostList-comment-icon" icon={faComment} size="xs"/>
                  {post.comments_count}
                </span>
              </li>

            </ul>

        	</li>
        ) }
      </ul>
    )
  }
}