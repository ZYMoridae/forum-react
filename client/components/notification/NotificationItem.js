import React, { Component } from 'react';
import { 
  Dropdown, 
  Icon, 
  Label, 
  Menu, 
  Image 
} from 'semantic-ui-react';
import './NotificationItem.sass';

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
            <ul>
              <li>
                <Image src={notification.sender.image} circular size='mini'/>
              </li>
              <li className="NotificationItem-meta">
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
