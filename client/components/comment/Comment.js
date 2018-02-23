import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './Comment.css';
import { Comment, Icon, Button } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';


function EventComment(props) {
  const { comment } = props;
  let newCommentMetaInfo = JSON.parse(comment.html_body);
  let res = '';
  if(newCommentMetaInfo && newCommentMetaInfo.sticky) {
    res = `${comment.user.username} sticked the post`;
  }

  return (
    <span style={{color: 'red'}}>{res}</span>
  )
}


function CmtContent(props) {
  const { comment, onClickHandler } = props;
  return (
    <Comment.Content>
      <Comment.Author>{comment.user.username}</Comment.Author>
      <Comment.Metadata>
        <span>
          <TimeAgo date={comment.created_at * 1000} />
        </span>
      </Comment.Metadata>
      <Comment.Text>
        { comment.type === 'comment' ? renderHTML(comment.html_body) : <EventComment comment={comment}/>}
      </Comment.Text>
      {comment.type === 'comment' ? 
        <Comment.Actions>
          <Comment.Action children={<Button color='youtube' circular={true} onClick={() => {onClickHandler(comment.id, comment.liked_by_user)}}><Icon name='like'/> {comment.liked_by_user ? 'Like' : 'Unlike'}</Button>}>
          </Comment.Action>
          <Comment.Action children={<Button color='linkedin' circular={true} onClick={onClickHandler}><Icon name='reply'/> Reply</Button>}>
          </Comment.Action>
        </Comment.Actions> 
        : ''
      }  
    </Comment.Content>
  )
}



export default class CommentItem extends Component {
  render() {
    const { comment, commentLike } = this.props;
    const onClickHandler = (id, liked_by_user) => {
      commentLike(id, liked_by_user);
    }
    let nestedComments = '';
    if(comment.replied_comments.length > 0) {
      nestedComments =  <Comment.Group size='large'>
                          {comment.replied_comments.map(nestedComment =>
                              <Comment key={nestedComment.id}>
                                <Comment.Avatar src={nestedComment.user.image} />
                                <CmtContent comment={nestedComment} onClickHandler={onClickHandler}/>
                              </Comment>
                            )}
                        </Comment.Group>
    }
    return (
      <Comment.Group size='large' threaded>
        <Comment>
          <Comment.Avatar src={comment.user.image} />
          <CmtContent comment={comment} onClickHandler={onClickHandler}/>
          {nestedComments}
        </Comment>
      </Comment.Group>
    )
  }
}
