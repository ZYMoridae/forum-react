import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './Comment.css';

export default class Comment extends Component {
  render() {
    return React.createElement(
      'div',
      { className: 'Comment' },
      React.createElement('img', { className: 'Comment-user-img', src: this.props.comment.user.image }),
      React.createElement(
        'span',
        { className: 'Comment-user-name' },
        this.props.comment.user.username
      ),
      React.createElement(
        'div',
        { className: 'Comment-body' },
        renderHTML(this.props.comment.html_body)
      )
    );
  }
}