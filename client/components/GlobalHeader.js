import React, { Component } from 'react';
import { fetchUserInfo } from '../actions';
import './GlobalHeader.css';
import logo from './logo.svg';
import UserPlaceholder from './user_placeholder.svg';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Image } from 'semantic-ui-react';

export default class GlobalHeader extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserInfo());
  }
  render() {
    const {isFetchingUser, isFetchedUser, info} = this.props;

    let heroImageComponent = <Image src={isFetchedUser ? info.image_url : UserPlaceholder} size='mini' className="GlobalHeader-hero-logo" circular />


    // <img src={isFetchedUser ? info.image_url : UserPlaceholder} className="GlobalHeader-hero-logo" alt="logo" />

    return (
      <div className="GlobalHeader">
        <div className="GlobalHeader-container">
          <h1 className="Header-title">
            <a href='/'>
              <img src="https://5df605d12ae556cf67ab-1f1de8f87db6161fed354e7e8d0d6d89.ssl.cf5.rackcdn.com/logo-abz62jo2.png" className="Logo"/>
            </a>
          </h1>
          <div className="GlobalHeader-secondary">
            <ul className="GlobalHeader-header-controls">
              <li className="GlobalHeader-item-button GlobalHeader-item">
                <a href="https://www.sweat.com/collections/gear">
                  <span>SHOP</span>
                </a>
              </li>
              <li className="GlobalHeader-item-button GlobalHeader-item">
                <a href="https://www.sweat.com/blogs/news">
                  <span>BLOG</span>
                </a>
              </li>
              <li className="GlobalHeader-item-button GlobalHeader-item GlobalHeader-item-forum">
                <a>
                  <span>FORUM</span>
                </a>
              </li>
              <li className="GlobalHeader-item-button GlobalHeader-item">
                <a>
                  <FontAwesomeIcon className="PostList-comment-icon" icon={faSearch} size="1x"/>
                </a>
              </li>
              <li className="GlobalHeader-item-session GlobalHeader-item">
                {heroImageComponent}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
