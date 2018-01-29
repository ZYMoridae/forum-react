import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, fetchTags } from '../../actions';
import './SecondNavigator.css';

class SecondNavigator extends Component {
  render() {
    const {tags} = this.props;
    if(tags) {
      return (
        <div className="SecondNavigator">
          <select className="SecondNavigator-tags" onChange={(event)=>this.props.onClick(event.target.value)}>
            { this.props.tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>) }
          </select>
        </div>
      )      
    }
    return <div>Tags loading...</div>
  }
}

const mapStateToProps = state => {
  return {
    tags: state.ForumReducer.tags
  }
}


export default connect(mapStateToProps)(SecondNavigator);