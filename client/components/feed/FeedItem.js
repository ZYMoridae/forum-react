import React, { Component } from 'react';

export default class FeedItem extends Component {
  render() {
    return (
      <div className="feeditem">
        { this.props.children }
      </div>
    )
  }
}
