import React from 'react';
import NotificationItem from '../components/notification/NotificationItem';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const mockNotificationItem = {
    subject_id: 1,
    sender: {
      image: '/assets/empty/1.png'
    },
    subject: {
      title: 'test title'
    },
    content_type: 'like_post'
  };

  const component = renderer.create(
    <NotificationItem notification={mockNotificationItem}/>,
  );
  let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});