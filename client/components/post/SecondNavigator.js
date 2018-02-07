import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, fetchTags } from '../../actions';
import './SecondNavigator.css';
import { Dropdown, Menu, Button } from 'semantic-ui-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import Spinner from 'react-spinkit';
import TextEditor from '../editor/TextEditor';

const TagDropdown = (props) => {
  const {tags, selectTagId, onClick} = props;
  let dropdownComponent = <Dropdown loading={true} simple item/>;
  if(tags) {
    const selectTagInfo = tags.filter(tag => {return tag.id === selectTagId});
    dropdownComponent = <Dropdown text={selectTagInfo.length > 0 ? selectTagInfo[0].name : ''} onChange={(event, data)=>onClick(event, data)} options={ tags.map(tag => {return { key: tag.id, text: tag.name, value: tag.id }}) } simple item/>    
  }
  return  <Menu compact>
            {dropdownComponent}
          </Menu>
}


class SecondNavigator extends Component {
  render() {
    const {tags, selectTagId, onClick, userInfo} = this.props;
    return  <div className="SecondNavigator">
              <TextEditor userInfo={userInfo}/>
              <TagDropdown tags={tags} selectTagId={selectTagId} onClick={onClick}/>
            </div>
  }
}

const mapStateToProps = state => {
  return {
    tags: state.ForumReducer.tags
  }
}

export default connect(mapStateToProps)(SecondNavigator);