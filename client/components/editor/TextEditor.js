import React, { Component } from 'react';
import { 
  Button, 
  Header, 
  Image, 
  Modal, 
  Input, 
  List 
} from 'semantic-ui-react';
import './TextEditor.css';
import ReactQuill from 'react-quill';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImage from '@fortawesome/fontawesome-free-solid/faImage';
import 'react-quill/dist/quill.snow.css';
import TagModal from './TagModal';
import ImageModal from './ImageModal';


export default class TextEditor extends Component {
  render() {
    const {userInfo, tags, tagInfos, tagClick, isImageModalOpen, openImageModal, closeImageModal, postImages, addImage, deleteImage, postTitleChanged, postBodyChanged, postTitle, postBody, createPost, newPostPending} = this.props;
    const handleChange = (value) => {
      postBodyChanged(value);
    };
    const postClick = () => {
      createPost(postTitle, postBody, tagInfos, postImages)
    };
    return (
      <div className="TextEditor">
        <Modal closeIcon={true} closeOnDimmerClick={false} dimmer='blurring' trigger={<Button color='blue' className="start-dsicussion-btn" size="large">Start Discussion</Button>}>
          <Modal.Content image>
            <Image wrapped size='tiny' circular src={userInfo && userInfo.image_url ? userInfo.image_url : '/assets/images/avatar/large/rachel.png'} />
            <Modal.Description>

              <List horizontal>
                <List.Item>
                  <List.Content>
                    <TagModal tags={tags} tagInfos={tagInfos} tagClick={tagClick}/>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Input className="post-title" placeholder='Post title...' value={postTitle} onChange={(e) => {postTitleChanged(e.target.value)}}/>
                  </List.Content>
                </List.Item>
              </List>
              
              <ReactQuill value={postBody} onChange={handleChange} placeholder='Write...' className="quill-editor"/>
              <List horizontal>
                <List.Item>
                  <List.Content>
                     <Button color='pink' className="post-btn" onClick={postClick} loading={newPostPending} disabled={newPostPending}>Post</Button>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <ImageModal isImageModalOpen={isImageModalOpen} openImageModal={openImageModal} closeImageModal={closeImageModal} postImages={postImages} addImage={addImage} deleteImage={deleteImage}/>
                  </List.Content>
                </List.Item>
              </List>              
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
