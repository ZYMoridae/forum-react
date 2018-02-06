import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';
import './PostList.css';
import { Link } from 'react-router-dom';

function PostItem(props) {
  let post = props.post;
  let postMeta = [].concat([post.id], [post.slug]).join('-');
  return React.createElement(
    'li',
    { className: 'PostList-item', key: post.id },
    React.createElement(
      Link,
      { to: `post/${postMeta}` },
      React.createElement(
        'ul',
        { className: 'PostList-item-sub' },
        React.createElement(
          'li',
          null,
          React.createElement('img', { className: 'PostList-hero-img', src: post.user.image })
        ),
        React.createElement(
          'li',
          { className: 'PostList-title' },
          React.createElement(
            'span',
            { className: 'PostList-title-link' },
            post.title
          ),
          React.createElement(
            'span',
            { className: 'PostList-comment' },
            React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faComment, size: 'xs' }),
            post.comments_count
          )
        )
      )
    )
  );
}

export default class PostList extends Component {
  render() {
    return React.createElement(
      'ul',
      { className: 'PostList' },
      this.props.posts.map(post => React.createElement(PostItem, { key: post.id, post: post }))
    );
  }
}