import React, { Component } from 'react';
import { fetchUserCardInfo } from '../actions';
import { Segment, Image, Item, Button } from 'semantic-ui-react';
import './Setting.css';
import AuthorsSongRaw from '../json/authors.song';

const authorsSongData = AuthorsSongRaw.data;

const AuthorSongList = () => {
  return (
    authorsSongData.map((song, index) => 
      <Segment key={index}>
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
      </Segment>
    )
  )
}




export default class Setting extends Component {
  componentDidMount() {
    const { dispatch, userInfo } = this.props;
    dispatch(fetchUserCardInfo(userInfo.username));
  }
  render() {
    const { userCardInfo, isFetchingUserCardInfo } = this.props;
    console.log(userCardInfo)

    let itemContent = '';
    if(userCardInfo) {
      itemContent = <Item>
                      <Item.Image size='tiny' src={userCardInfo ? userCardInfo.image : ''} />

                      <Item.Content>
                        <Item.Header as='a'>{userCardInfo.username}</Item.Header>
                        <Item.Meta>{userCardInfo.bio}</Item.Meta>
                        <Item.Extra>
                          <Button circular color='facebook' icon='facebook' size="mini"/>
                          <Button circular color='twitter' icon='twitter' size="mini"/>
                          <Button circular color='linkedin' icon='linkedin' size="mini"/>
                          <Button circular color='google plus' icon='google plus' size="mini"/>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
    }

    return (
      <div className="Setting">
        <Segment>
          <Item.Group>
            {itemContent}
          </Item.Group>
        </Segment>
        {/*<AuthorSongList />*/}
      </div>
    )
  }
}
