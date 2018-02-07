import React, { Component } from 'react';
import { Button, Header, Image, Modal, Input } from 'semantic-ui-react';
import './TextEditor.css';
import ReactQuill from 'react-quill';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImage from '@fortawesome/fontawesome-free-solid/faImage';
import 'react-quill/dist/quill.snow.css';

export default class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  render() {
    const {userInfo} = this.props;
    return (
      <div className="TextEditor">
        <Modal dimmer='blurring' trigger={<Button color='black' className="start-dsicussion-btn">Start Discussion</Button>}>
          <Modal.Content image>
            <Image wrapped size='tiny' circular src={userInfo && userInfo.image_url ? userInfo.image_url : '/assets/images/avatar/large/rachel.png'} />
            <Modal.Description>
              <Input className="post-title" placeholder='Post title...' />
              <ReactQuill value={this.state.text}
                    onChange={this.handleChange} placeholder='Write...' className="quill-editor"/>
              <Button color='pink' className="post-btn">Post</Button>
              <Button color='pink' className="image-attach-btn">
                <FontAwesomeIcon icon={faImage} size="1x"/>
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>      
      </div>
    )
  }
}
