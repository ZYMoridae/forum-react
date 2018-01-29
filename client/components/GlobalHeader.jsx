import React, { Component } from 'react';

export default class GlobalHeader extends Component {
  render() {
    return (
      <div className="globalheader">
        { this.props.children }
      </div>
    )
  }
}
