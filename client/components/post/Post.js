import React, { Component } from 'react';
import { 
  fetchPostInfo, 
  fetchPostComments 
} from '../../actions';
import Comment from '../../components/comment/Comment';
import Spinner from 'react-spinkit';
import './Post.sass';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faShare from '@fortawesome/fontawesome-free-solid/faShare';
import faStar from '@fortawesome/fontawesome-free-solid/faStar';
import faStarO from '@fortawesome/fontawesome-free-regular/faStar';
import faEyeSlash from '@fortawesome/fontawesome-free-solid/faEyeSlash';
import { 
  Button, 
  Dropdown, 
  Icon, 
  Modal, 
  Image, 
  Header, 
  List
} from 'semantic-ui-react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton,
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  EmailIcon,
} from 'react-share';

function PostDetails(props) {
  const postInfo = props.post;
  let spinnerBlock = '';
  let replyBlock = '';
  if (props.hasMoreComments && props.isFetchingPostComments) {
    spinnerBlock = <div className="Post-spinner"><Spinner name="pacman"/></div>;
  }
  if (props.userInfo) {
    replyBlock =  <div className="Comment Comment-reply-block">
                    <div className="Comment-reply-block-container">
                      <img className="Comment-user-img" src={props.userInfo.image_url} />
                      <span className="Comment-user-name">{props.userInfo.username}</span>
                    </div>
                  </div>
  }
  return  <div>
            <PostActions post={props.post} isFollowPost={props.isFollowPost} onFollowClick={props.onFollowClick}/>
            <div className="Post-info-container">
              <h2 className="Post-title">{postInfo.title}</h2>
              <h5 className="Post-tags">
                {postInfo.tags.map((tag, index) => <span className="Post-tag" key={tag.id}>{tag.name}{index === postInfo.tags.length - 1 ? '' : ','}</span>)}
              </h5>
              <div className="Post-comments-container">
                {props.comments.map(comment => <Comment key={comment.id} comment={comment} commentLike={props.commentLike}/>)}
                {replyBlock}
                {spinnerBlock}
              </div>
            </div>
          </div>
}


function ShareModalBox(props) {
  let shareUrl = window.location.hostname;
  return <Modal size='tiny' trigger={<Button color='blue' className="Post-action-item-btn"><FontAwesomeIcon className="PostList-comment-icon" icon={faShareAlt} size="1x"/>
                Share</Button>}>
          <Modal.Header>Share</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <List horizontal>
                <List.Item>
                  <List.Content>
                    <FacebookShareButton url={shareUrl} children={<FacebookIcon round={true} size={32}/>}/>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <GooglePlusShareButton url={shareUrl} children={<GooglePlusIcon round={true} size={32}/>}/>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <TwitterShareButton url={shareUrl} children={<TwitterIcon round={true} size={32}/>}/>
                  </List.Content>
                </List.Item>
              </List>
            </Modal.Description>
          </Modal.Content>
        </Modal>
}



function PostActions(props) {
  return  <div className="Post-actions">
            <div className="Post-action-item">
              <ShareModalBox />
            </div>
            <div className="Post-action-item">
              <Button color='black' className="Post-action-item-btn">
                <FontAwesomeIcon className="PostList-comment-icon" icon={faShare} size="1x"/>
                Reply
              </Button>
            </div>
            <div className="Post-action-item">
              <FollowDropdown post={props.post} isFollowPost={props.isFollowPost} onFollowClick={props.onFollowClick}/>
            </div>
          </div>
}



const FollowDropdown = (props) => (
  <Dropdown text={props.isFollowPost ? 'Following' : 'Not following'} icon={props.isFollowPost ? 'star' : 'empty star'} floating labeled button className='icon Post-action-item-btn'>
    <Dropdown.Menu>
      <Dropdown.Item onClick={(event) => {props.onFollowClick(props.post.id, false)}}>
        <FontAwesomeIcon className="PostList-comment-icon" icon={faStarO} size="1x"/>
        Not following
      </Dropdown.Item>
      <Dropdown.Item onClick={(event) => {props.onFollowClick(props.post.id, true)}}>
        <FontAwesomeIcon className="PostList-comment-icon" icon={faStar} size="1x"/>
        Following
      </Dropdown.Item>
      <Dropdown.Item>
        <FontAwesomeIcon className="PostList-comment-icon" icon={faEyeSlash} size="1x"/>
        Ignoring
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)


export default class Post extends Component {
  componentDidMount() {
    const meta_id = this.props.postId.split('-')[0];
    const {hasMoreComments, lastCommentId, markPostAsRead} = this.props;
    this.props.dispatch(fetchPostInfo({
      id: meta_id
    }));
    this.props.dispatch(fetchPostComments({
      id: meta_id, 
      hasMoreComments: hasMoreComments
    }));
    markPostAsRead(meta_id);
    window.addEventListener('scroll', this.loadMoreComments.bind(this));
  }
  loadMoreComments() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if(windowBottom >= docHeight && !this.props.isFetchingPostComments && this.props.hasMoreComments) {
      this.props.dispatch(fetchPostComments({
        id: this.props.info.id,
        hasMoreComments: this.props.hasMoreComments,
        lastCommentId: this.props.postComments[this.props.postComments.length - 1].id
      }));
    }
  }
  render() {
    const { isFetchingPost, info, isFetchingPostComments, hasMoreComments, postComments, userInfo, isFollowPost, onFollowClick, commentLike} = this.props;
    return (
      <div className="Post">
        { info ? <PostDetails onFollowClick={onFollowClick} post={info} comments={postComments} isFollowPost={isFollowPost} userInfo={userInfo} isFetchingPostComments={isFetchingPostComments} hasMoreComments={hasMoreComments} commentLike={commentLike}/> : <div className="Post-spinner"><Spinner name="pacman"/></div> }
      </div>
    )
  }
}
