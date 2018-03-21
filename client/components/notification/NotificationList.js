import React, { Component } from 'react';
import { 
  Dropdown, 
  Icon, 
  Label, 
  Menu 
} from 'semantic-ui-react';
import NotificationItem from './NotificationItem';
import './NotificationList.sass';

const NotificationPlaceholder = (props) => {
  const {notificationTotalCount, notifications} = props;
  return (
    <div className="notification-placeholder">
      <Icon name='mail' className="icon" size="large"/>
      <Label color='red' circular floating>{notificationTotalCount}</Label>
    </div>
  )
}

export default class NotificationList extends Component {
  render() {
    const {notificationTotalCount, notifications} = this.props;
    return (
      <div className="NotificationList">
        <Dropdown icon={<NotificationPlaceholder notificationTotalCount={notificationTotalCount}/>}>
          <Dropdown.Menu>
            {notifications.map(notification => <NotificationItem key={notification.id} notification={notification}/>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}
