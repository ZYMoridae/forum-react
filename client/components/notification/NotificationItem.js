import React, { Component } from 'react';
import { 
  Dropdown, 
  Icon, 
  Label, 
  Menu, 
  Image 
} from 'semantic-ui-react';
import './NotificationItem.css';

export default class NotificationItem extends Component {

  render() {
    const {notification} = this.props;
    const redirectToSetting = () => {
      window.location.assign(`/#/post/${notification.subject_id}`); 
      window.location.reload();
    }
    return (
      <div className="NotificationItem">
        <Dropdown.Item className="NotificationItem-block" description={notification.content_type} content={notification.subject.title} image={<Image src={notification.sender.image} circular size='mini' onClick={redirectToSetting}/>} />
      </div>
    )
  }
}
