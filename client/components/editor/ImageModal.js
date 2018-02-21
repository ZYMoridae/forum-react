import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImage from '@fortawesome/fontawesome-free-solid/faImage';
import { 
  Button, 
  Header, 
  Image, 
  Modal, 
  Input, 
  List, 
  Container, 
  Icon
} from 'semantic-ui-react';
import './ImageModal.css';


const ImageList = (props) => {
  const { postImages } = props;
  let blockContent =  <Container textAlign='center'>
                        <Header as='h2'>
                          <Icon color='red' name='exclamation triangle' />
                          <Header.Content>
                            No images!
                          </Header.Content>
                        </Header>
                      </Container>
  if(postImages.length > 0) {
    blockContent =  <List horizontal>
                      {postImages.map(image_item => 
                        <List.Item key={image_item.key}>
                          <List.Content>
                            <Image size='small' src={image_item.url}/>
                            <Button fluid={true} color='red' inverted onClick={() => {deleteImage(image_item)}}>
                              <Icon name='remove' /> Delete
                            </Button>
                          </List.Content>
                        </List.Item>)}
                    </List>
  }
  return blockContent
}


export default class ImageModal extends Component {
  render() {
    const { isImageModalOpen, openImageModal, closeImageModal, postImages, addImage, deleteImage } = this.props;
    const addImageClick = () => {
      var inputField = this.refs.fileField;
      inputField.click();
    };
    const fileAdded = (e) => {
      let file = this.refs.fileField.files[0];
      let fileUrl = URL.createObjectURL(file);
      this.refs.fileField.value = '';
      addImage({
        name: file.name,
        file: file,
        url: fileUrl,
        key: Date.now()
      });
    };
    return (
      <div className="ImageModal">
        <Modal open={isImageModalOpen} onOpen={openImageModal} onClose={closeImageModal} closeOnDimmerClick={false} size="small" trigger={
                                    <Button onClick={openImageModal} color='pink' className="image-attach-btn">
                                      <FontAwesomeIcon icon={faImage} size="1x"/>
                                    </Button>}>
          <Modal.Header>Add Images</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className='x-scroll-container'>
                <ImageList postImages={postImages}/>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <input ref="fileField" type="file" id="file" style={{display: 'none'}} onChange={fileAdded}/>
            <Button color='green' inverted onClick={addImageClick}>
              <Icon name='plus' /> Add
            </Button>
            <Button color='red' inverted onClick={closeImageModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' inverted onClick={closeImageModal}>
              <Icon name='checkmark' /> Ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
