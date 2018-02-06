import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './Comment.css';

export default class Comment extends Component {
  render() {
    return (
      <div className="Comment">
        <img className="Comment-user-img" src={this.props.comment.user.image} />
        <span className="Comment-user-name">{this.props.comment.user.username}</span>
        <div className="Comment-body">
          { renderHTML(this.props.comment.html_body) }
        </div>
      </div>
    )
  }
}
