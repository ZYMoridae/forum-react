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
    const { isFetchingUser, isFetchedUser, info } = this.props;

    let heroImageComponent = React.createElement(Image, { src: isFetchedUser ? info.image_url : UserPlaceholder, size: 'mini', className: 'GlobalHeader-hero-logo', circular: true });

    // <img src={isFetchedUser ? info.image_url : UserPlaceholder} className="GlobalHeader-hero-logo" alt="logo" />

    return React.createElement(
      'div',
      { className: 'GlobalHeader' },
      React.createElement(
        'div',
        { className: 'GlobalHeader-container' },
        React.createElement(
          'h1',
          { className: 'Header-title' },
          React.createElement(
            'a',
            { href: '/' },
            React.createElement('img', { src: 'https://5df605d12ae556cf67ab-1f1de8f87db6161fed354e7e8d0d6d89.ssl.cf5.rackcdn.com/logo-abz62jo2.png', className: 'Logo' })
          )
        ),
        React.createElement(
          'div',
          { className: 'GlobalHeader-secondary' },
          React.createElement(
            'ul',
            { className: 'GlobalHeader-header-controls' },
            React.createElement(
              'li',
              { className: 'GlobalHeader-item-button GlobalHeader-item' },
              React.createElement(
                'a',
                { href: 'https://www.sweat.com/collections/gear' },
                React.createElement(
                  'span',
                  null,
                  'SHOP'
                )
              )
            ),
            React.createElement(
              'li',
              { className: 'GlobalHeader-item-button GlobalHeader-item' },
              React.createElement(
                'a',
                { href: 'https://www.sweat.com/blogs/news' },
                React.createElement(
                  'span',
                  null,
                  'BLOG'
                )
              )
            ),
            React.createElement(
              'li',
              { className: 'GlobalHeader-item-button GlobalHeader-item GlobalHeader-item-forum' },
              React.createElement(
                'a',
                null,
                React.createElement(
                  'span',
                  null,
                  'FORUM'
                )
              )
            ),
            React.createElement(
              'li',
              { className: 'GlobalHeader-item-button GlobalHeader-item' },
              React.createElement(
                'a',
                null,
                React.createElement(FontAwesomeIcon, { className: 'PostList-comment-icon', icon: faSearch, size: '1x' })
              )
            ),
            React.createElement(
              'li',
              { className: 'GlobalHeader-item-session GlobalHeader-item' },
              heroImageComponent
            )
          )
        )
      )
    );
  }
}