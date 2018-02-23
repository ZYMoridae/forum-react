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
    const redirectToPost = () => {
      window.location.assign(`/#/post/${notification.subject_id}`); 
      window.location.reload();
    }
    return (
      <div className="NotificationItem">
        <Dropdown.Item className="NotificationItem-block" children={
          <a onClick={redirectToPost}>
            <ul style={{listStyle: 'no-bullet', display: 'inline-flex', paddingLeft: '0px'}}>
              <li>
                <Image src={notification.sender.image} circular size='mini'/>
              </li>
              <li style={{marginLeft: '10px'}}>
                <span>
                  <div>{notification.content_type}</div>
                  <div>{notification.subject.title}</div>
                </span>
              </li>
            </ul>
          </a>
        } />
      </div>
    )
  }
}
