import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './Comment.css';
import { Comment, Icon, Button } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

export default class CommentItem extends Component {
  render() {
    const { comment, commentLike } = this.props;
    const onClickHandler = () => {
      commentLike(comment.id, comment.liked_by_user);
    }
    let nestedComments = '';
    if(comment.replied_comments.length > 0) {
      nestedComments =  <Comment.Group size='large'>
                          {comment.replied_comments.map(nestedComment =>
                              <Comment key={nestedComment.id}>
                                <Comment.Avatar src={nestedComment.user.image} />
                                <Comment.Content>
                                  <Comment.Author>{nestedComment.user.username}</Comment.Author>
                                  <Comment.Text>
                                    { renderHTML(nestedComment.html_body) }
                                  </Comment.Text>
                                  <Comment.Actions>
                                    <Comment.Action children={<Button color='youtube' circular={true} onClick={onClickHandler}><Icon name='like'/> {comment.liked_by_user ? 'Like' : 'Unlike'}</Button>}>
                                    </Comment.Action>
                                    <Comment.Action children={<Button color='linkedin' circular={true} onClick={onClickHandler}><Icon name='reply'/> Reply</Button>}>
                                    </Comment.Action>
                                  </Comment.Actions>
                                </Comment.Content>
                              </Comment>
                            )}
                        </Comment.Group>
    }
    return (
      <Comment.Group size='large' threaded>
        <Comment>
          <Comment.Avatar src={comment.user.image} />
          <Comment.Content>
            <Comment.Author>{comment.user.username}</Comment.Author>
            <Comment.Metadata>
              <span>
                <TimeAgo date={comment.created_at*1000} />
              </span>
            </Comment.Metadata>
            <Comment.Text>
              { renderHTML(comment.html_body) }
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action children={<Button color='youtube' circular={true} onClick={onClickHandler}><Icon name='like'/> {comment.liked_by_user ? 'Like' : 'Unlike'}</Button>}>
              </Comment.Action>
              <Comment.Action children={<Button color='linkedin' circular={true} onClick={onClickHandler}><Icon name='reply'/> Reply</Button>}>
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          {nestedComments}
        </Comment>
      </Comment.Group>
    )
  }
}
