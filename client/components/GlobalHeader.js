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
      heroImageComponent = <img src={info.image_url} className="Dashboard-logo" alt="logo" />
    }

    return (
      <div className="GlobalHeader">
        {heroImageComponent}
        <span>Global Header</span>
      </div>
    )
  }
}
