import React, { Component } from 'react';
import { fetchUserInfo } from '../actions';
import './GlobalHeader.css';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

export default class GlobalHeader extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserInfo());
  }
  render() {
    const {isFetchingUser, isFetchedUser, info} = this.props;

    let heroImageComponent = <span>Loading</span>
    if(isFetchedUser){
      heroImageComponent = <img src={info.image_url} className="GlobalHeader-hero-logo" alt="logo" />
    }

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
      </div>
    )
  }
}
