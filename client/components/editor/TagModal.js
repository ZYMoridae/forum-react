import React, { Component } from 'react';
import { 
  Button, 
  Header, 
  Image, 
  Modal, 
  List, 
  Form
} from 'semantic-ui-react';
import './TagModal.css';


function TagItem(props) {
  const {item, tagClick, allTagIds} = props;
  const changeHandler = () => {
    tagClick(item);
  };
  return (
    <List.Item>
      <List.Content>
        <a style={{color: item.color}}>
          <div>
            <input type='checkbox' onChange={changeHandler} checked={allTagIds.indexOf(item.id) !== -1} disabled={allTagIds.length >= 3 && allTagIds.indexOf(item.id) === -1}/>
            <label style={{color: item.color}}>{item.name}</label>
          </div>
          <div style={{color: item.color}}>{item.body}</div>          
        </a>
      </List.Content>
    </List.Item>
  )
}


export default class TagModal extends Component {
  render() {

    const { tags, tagClick, tagInfos} = this.props;
    let renderComponent = <Button basic color='blue'>Choose Tags</Button>;

    if(tagInfos.length > 0) {
      let allTagNames = tagInfos.map(tag => tag.name).join(', ');
      renderComponent = <Button basic color='blue'>
                          {allTagNames}
                        </Button>
    }
    let allTagIds = tagInfos.map(tag => tag.id);
    return (
      <div className="tagmodal">
        <Modal trigger={renderComponent}>
          <Modal.Header>Select Tags</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="scroll-container">
                <List divided relaxed>
                  <Form>
                    <Form.Group grouped>
                      {tags.map(item => <TagItem key={item.id} item={item} tagClick={tagClick} allTagIds={allTagIds}/>)}
                    </Form.Group>
                  </Form>  
                </List>  
              </div>            
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}
