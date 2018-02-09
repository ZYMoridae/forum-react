import React, { Component } from 'react';
import renderHTML from 'react-render-html';
import './Comment.css';
import { Comment, Icon } from 'semantic-ui-react';

export default class CommentItem extends Component {
  render() {
    const { comment } = this.props;
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
                                    <Comment.Action>
                                      <Icon name='like' /> Like
                                    </Comment.Action>
                                    <Comment.Action>
                                      <Icon name='reply' /> Reply
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
              <span>{comment.created_at}</span>
            </Comment.Metadata>
            <Comment.Text>
              { renderHTML(comment.html_body) }
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>
                <Icon name='like' /> Like
              </Comment.Action>
              <Comment.Action>
                <Icon name='reply' /> Reply
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          {nestedComments}
        </Comment>
      </Comment.Group>
    )
  }
}
