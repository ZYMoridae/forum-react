import React, { Component } from 'react';
import { 
  Dropdown, 
  Icon, 
  Label, 
  Menu 
} from 'semantic-ui-react';
import NotificationItem from './NotificationItem';


const NotificationPlaceholder = (props) => {
  const {notificationTotalCount, notifications} = props;
  return (
    <div style={{position: 'relative', marginBottom: '10px'}}>
      <Icon name='mail' size="large" style={{color: 'white'}} />
      <Label color='red' circular floating>{notificationTotalCount}</Label>
    </div>
  )
}

export default class NotificationList extends Component {
  render() {
    const {notificationTotalCount, notifications} = this.props;
    return (
      <div className="notificationlist">
        <Dropdown icon={<NotificationPlaceholder notificationTotalCount={notificationTotalCount}/>}>
          <Dropdown.Menu>
            {notifications.map(notification => <NotificationItem key={notification.id} notification={notification}/>)}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}
