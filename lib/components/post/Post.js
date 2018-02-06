import React, { Component } from 'react';
import { fetchPostInfo, fetchPostComments } from '../../actions';
import Comment from '../../components/comment/Comment';
import Spinner from 'react-spinkit';
import './Post.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faShare from '@fortawesome/fontawesome-free-solid/faShare';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';
import faStarO from '@fortawesome/fontawesome-free-regular/faStar';
import faEyeSlash from '@fortawesome/fontawesome-free-solid/faEyeSlash';
import { Button, Dropdown, Icon } from 'semantic-ui-react';

function PostDetails(props) {
  const postInfo = props.post;
  let spinnerBlock = '';
  let replyBlock = '';
  if (props.hasMoreComments && props.isFetchingPostComments) {
    spinnerBlock = React.createElement(
      'div',
      { className: 'Post-spinner' },
      React.createElement(Spinner, { name: 'cube-grid' })
    );
  }
  if (props.userInfo) {
    replyBlock = React.createElement(
      'div',
      { className: 'Comment Comment-reply-block' },
      React.createElement(
        'div',
        { className: 'Comment-reply-block-container' },
        React.createElement('img', { className: 'Comment-user-img', src: props.userInfo.image_url }),
        React.createElement(
          'span',
          { className: 'Comment-user-name' },
          props.userInfo.username
        )
      )
    );
  }
  return React.createElement(
    'div',
    null,
    React.createElement(PostActions, { post: props.post, isFollowPost: props.isFollowPost, onFollowClick: props.onFollowClick }),
    React.createElement(
      'div',
      { className: 'Post-info-container' },
      React.createElement(
        'h3',
        { className: 'Post-title' },
        postInfo.title
      ),
      React.createElement(
        'h5',
        { className: 'Post-tags' },
        postInfo.tags.map((tag, index) => React.createElement(
          'span',
          { className: 'Post-tag', key: tag.id },
          tag.name,
          index === postInfo.tags.length - 1 ? '' : ','
        ))
      ),
      React.createElement(
        'div',
        { className: 'Post-comments-container' },
        props.comments.map(comment => React.createElement(Comment, { key: comment.id, comment: comment })),
        replyBlock,
        spinnerBlock
      )
    )
  );
}

function PostActions(props) {
  return React.createElement(
    'div',
    { className: 'Post-actions' },
    React.createElement(
      'div',
      { className: 'Post-action-item' },
      React.createElement(
        Button,
        { color: 'pink', className: 'Post-action-item-btn' },
        React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faShareAlt, size: '1x' }),
        'Share'
      )
    ),
    React.createElement(
      'div',
      { className: 'Post-action-item' },
      React.createElement(
        Button,
        { color: 'purple', className: 'Post-action-item-btn' },
        React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faShare, size: '1x' }),
        'Reply'
      )
    ),
    React.createElement(
      'div',
      { className: 'Post-action-item' },
      React.createElement(FollowDropdown, { post: props.post, isFollowPost: props.isFollowPost, onFollowClick: props.onFollowClick })
    )
  );
}

const FollowDropdown = props => React.createElement(
  Dropdown,
  { text: props.isFollowPost ? 'Following' : 'Not following', icon: props.isFollowPost ? 'star' : 'empty star', floating: true, labeled: true, button: true, className: 'icon Post-action-item-btn' },
  React.createElement(
    Dropdown.Menu,
    null,
    React.createElement(
      Dropdown.Item,
      { onClick: event => {
          props.onFollowClick(props.post.id, false);
        } },
      React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faStarO, size: '1x' }),
      'Not following'
    ),
    React.createElement(
      Dropdown.Item,
      { onClick: event => {
          props.onFollowClick(props.post.id, true);
        } },
      React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faStar, size: '1x' }),
      'Following'
    ),
    React.createElement(
      Dropdown.Item,
      null,
      React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faEyeSlash, size: '1x' }),
      'Ignoring'
    )
  )
);

export default class Post extends Component {
  componentDidMount() {
    const meta_id = this.props.postId.split('-')[0];
    const { hasMoreComments, lastCommentId } = this.props;
    this.props.dispatch(fetchPostInfo({
      id: meta_id
    }));
    this.props.dispatch(fetchPostComments({
      id: meta_id,
      hasMoreComments: hasMoreComments
    }));
    window.addEventListener('scroll', this.loadMoreComments.bind(this));
  }
  loadMoreComments() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !this.props.isFetchingPostComments && this.props.hasMoreComments) {
      this.props.dispatch(fetchPostComments({
        id: this.props.info.id,
        hasMoreComments: this.props.hasMoreComments,
        lastCommentId: this.props.postComments[this.props.postComments.length - 1].id
      }));
    }
  }
  render() {
    const { isFetchingPost, info, isFetchingPostComments, hasMoreComments, postComments, userInfo, isFollowPost, onFollowClick } = this.props;
    return React.createElement(
      'div',
      { className: 'Post' },
      info ? React.createElement(PostDetails, { onFollowClick: onFollowClick, post: info, comments: postComments, isFollowPost: isFollowPost, userInfo: userInfo, isFetchingPostComments: isFetchingPostComments, hasMoreComments: hasMoreComments }) : React.createElement(
        'div',
        { className: 'Post-spinner' },
        React.createElement(Spinner, { name: 'cube-grid' })
      )
    );
  }
}