import React, { Component } from 'react';
import { fetchUserInfo } from '../actions';
import './GlobalHeader.css';
import logo from './logo.svg';

export default class GlobalHeader extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserInfo());
  }
  render() {
    const {isFetchingUser, isFetchedUser, info} = this.props;

    let heroImageComponent = <span>Loading</span>
    if(isFetchedUser){
      heroImageComponent = <img src={info.image_url} className="GlobalHeader-logo" alt="logo" />
    }

    return (
      <div className="GlobalHeader">
        <div className="GlobalHeader-secondary">
          <ul className="GlobalHeader-header-controls">
            <li className="GlobalHeader-item-button GlobalHeader-item">
              <a>
                <span>SHOP</span>
              </a>
            </li>
            <li className="GlobalHeader-item-button GlobalHeader-item">
              <a>
                <span>BLOG</span>
              </a>
            </li>
            <li className="GlobalHeader-item-session GlobalHeader-item">
              {heroImageComponent}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
