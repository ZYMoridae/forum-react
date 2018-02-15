import React, { Component } from 'react';
import { fetchUserCardInfo, toggleVisibility} from '../actions';
import { Segment, Image, Item, Button, Message, Card, Icon, Sidebar, Menu, Header} from 'semantic-ui-react';
import './Setting.css';
import AuthorsSongRaw from '../json/authors.song';
import _ from 'lodash';

const authorsSongData = AuthorsSongRaw.data;

const AuthorSongList = () => {
  return (
    authorsSongData.map((song, index) => 
      <Message key={index} raised={false  }>
        <Item.Group divided>
          <Item>
            <Item.Image size='tiny' src='' />
            <Item.Content>
              <Item.Header as='a'>{song.name}</Item.Header>
              <Item.Meta>{song.desc}</Item.Meta>
              <Item.Extra>
                <Button circular color='facebook' icon='facebook' size="mini"/>
                <Button circular color='twitter' icon='twitter' size="mini"/>
                <Button circular color='linkedin' icon='linkedin' size="mini"/>
                <Button circular color='google plus' icon='google plus' size="mini"/>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>    
      </Message>
    )
  )
}



const UserCard = (props) => {
  const {userCardInfo} = props;

  let src_array = [
    'elliot.jpg', 
    'matthew.png', 
    'daniel.jpg', 
    'steve.jpg',
    'jenny.jpg',
    'molly.png',
    'christian.jpg',
    'justen.jpg',
    'matt.jpg',
    'stevie.jpg'
  ]
  return (
    <Card>
      <Image src={`https://react.semantic-ui.com/assets/images/avatar/large/${src_array[parseInt(Math.random() * 100, 10) % src_array.length]}`} />
      <Card.Content>
        <Card.Header>
          {userCardInfo.username}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            Joined in 2015
          </span>
        </Card.Meta>
        <Card.Description>
          {userCardInfo.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          {/*<Icon name='user' />*/}
          <Button circular color='facebook' icon='facebook' size="mini"/>
          <Button circular color='twitter' icon='twitter' size="mini"/>
          <Button circular color='linkedin' icon='linkedin' size="mini"/>
          <Button circular color='google plus' icon='google plus' size="mini"/>
        </a>
      </Card.Content>
    </Card>
  )
}


export default class Setting extends Component {
  componentDidMount() {
    const { dispatch, userInfo, visible } = this.props;
    dispatch(fetchUserCardInfo(userInfo.username));
  }
  render() {
    const { userCardInfo, isFetchingUserCardInfo, visible, toggleSideBar} = this.props;

    let itemContent = '';
    if(userCardInfo) {
      itemContent =  _.range(1, 15).map((item, index) => <UserCard key={index} userCardInfo={userCardInfo}/>)
    }

    return (
      <div className="Setting">
        <Button onClick={this.props.toggleSideBar}>Toggle Visibility</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide along' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {/*<Segment basic>*/}
            <Card.Group>
              {itemContent}
            </Card.Group>
            {/*</Segment>*/}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        {/*<AuthorSongList />*/}
      </div>
    )
  }
}
