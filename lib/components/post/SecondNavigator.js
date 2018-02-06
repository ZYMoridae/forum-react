import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, fetchTags } from '../../actions';
import './SecondNavigator.css';

class SecondNavigator extends Component {
  render() {
    const { tags } = this.props;
    if (tags) {
      return React.createElement(
        'div',
        { className: 'SecondNavigator' },
        React.createElement(
          'select',
          { className: 'SecondNavigator-tags', onChange: event => this.props.onClick(event.target.value) },
          this.props.tags.map(tag => React.createElement(
            'option',
            { key: tag.id, value: tag.id },
            tag.name
          ))
        )
      );
    }
    return React.createElement(
      'div',
      null,
      'Tags loading...'
    );
  }
}

const mapStateToProps = state => {
  return {
    tags: state.ForumReducer.tags
  };
};

export default connect(mapStateToProps)(SecondNavigator);