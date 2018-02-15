import React, { Component } from 'react';

export default class FeedList extends Component {
  render() {
    return (
      <div className="feedlist">
        { this.props.children }
      </div>
    )
  }
}
