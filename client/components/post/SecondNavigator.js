import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  fetchTags 
} from '../../actions';
import './SecondNavigator.sass';
import { 
  Dropdown, 
  Menu, 
  Button 
} from 'semantic-ui-react';
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
  return  <Menu compact size="tiny">
            {dropdownComponent}
          </Menu>
}


class SecondNavigator extends Component {
  render() {
    const {tags, selectTagId, onClick, userInfo, tagInfos, tagClick, isImageModalOpen, openImageModal, closeImageModal, postImages, addImage, deleteImage, postTitleChanged, postBodyChanged, postTitle, postBody, createPost, newPostPending} = this.props;
    return  <div className="SecondNavigator">
              <TextEditor userInfo={userInfo} tags={tags} tagInfos={tagInfos} tagClick={tagClick} isImageModalOpen={isImageModalOpen} openImageModal={openImageModal} closeImageModal={closeImageModal} postImages={postImages} addImage={addImage} deleteImage={deleteImage} postTitleChanged={postTitleChanged} postBodyChanged={postBodyChanged} postTitle={postTitle} postBody={postBody} createPost={createPost} newPostPending={newPostPending}/>
              <TagDropdown tags={tags} selectTagId={selectTagId} onClick={onClick}/>
              <div className="fb-messenger-checkbox" 
                   origin='119.18.42.150'
                   messenger_app_id="646106995537624" 
                   page_id="763671557066427"
                   allow_login='true'
                   size="large">
              </div>
            </div>
  } 
}

const mapStateToProps = state => {
  return {
    tags: state.ForumReducer.tags
  }
}

export default connect(mapStateToProps)(SecondNavigator);