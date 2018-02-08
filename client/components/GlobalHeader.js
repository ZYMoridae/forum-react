import React, { Component } from 'react';
import { fetchUserInfo } from '../actions';
import './GlobalHeader.css';
import logo from './logo.svg';
import UserPlaceholder from './user_placeholder.svg';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Dropdown, Image, Modal, Button, Divider, Form, Checkbox, Icon} from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Trigger = (props) => {
  return (
    <span>
      <Image avatar src={props.userInfo && props.userInfo.image_url ? props.userInfo.image_url : ''} />
    </span>
  )
}

const LoginModal = (props) => {
  const { formInputOnChangeCallback, formData, fbLoginCallback, isLoginModalOpen, loginModalOpen, loginModalClose, isFetchingUser, accountLogin } = props;
  return (
    <Modal open={isLoginModalOpen} onClose={loginModalClose} size="tiny" dimmer='blurring' trigger={<Button loading={isFetchingUser} onClick={loginModalOpen} className='login-btn'>Log in</Button>}>
      <Modal.Content image>
        <Modal.Description>
          <Form onSubmit={(event, data) => {accountLogin(event, data, formData)}}>
            <Form.Field>
              <label>Email</label>
              <Form.Input placeholder='Email' name='formEmail' value={formData.formEmail} onChange={(event, data)=>{formInputOnChangeCallback(event, data)}}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Form.Input placeholder='Password' type="password" name='formPassword' value={formData.formPassword} onChange={(event, data)=>{formInputOnChangeCallback(event, data)}}/>
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type="submit" secondary fluid>Login</Button>
          </Form>
          <FacebookLogin appId="646106995537624" callback={fbLoginCallback} render={renderProps => (<Button onClick={renderProps.onClick} fluid color='facebook' className='fb-login'>
            <Icon name='facebook' /> Facebook
          </Button>)}/>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sign Up Now</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const DropdownOptions = (logOut) => {
  return [
    { key: 'user', value: 'user', text: 'Account', icon: 'user' },
    { key: 'settings', value: 'settings', text: 'Settings', icon: 'settings' },
    { key: 'sign-out', value: 'sign-out', text: <span onClick={logOut}>Sign out</span>, icon: 'sign out' }
  ]
}

export default class GlobalHeader extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserInfo());
  }
  render() {
    const {isFetchingUser, isFetchedUser, info, formInputOnChange, formEmail, formPassword, fbLoginCallback, isLoginModalOpen, loginModalOpen, loginModalClose, logOut, accountLogin} = this.props;

    let formData = {formEmail: formEmail, formPassword: formPassword};

    let userControlComponent = <LoginModal formInputOnChange={formInputOnChange} formData={formData} fbLoginCallback={fbLoginCallback} isLoginModalOpen={isLoginModalOpen} loginModalOpen={loginModalOpen} loginModalClose={loginModalClose} isFetchingUser={isFetchingUser} accountLogin={accountLogin}/>

    if(info) {
      userControlComponent = <Dropdown keeponscreen="true" trigger={<Trigger userInfo={info}/>} options={DropdownOptions(logOut)} pointing='top left' icon={null} />
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
              <li className="GlobalHeader-item-session GlobalHeader-item User-control">
                {userControlComponent}
              </li>
              <li className="GlobalHeader-item-session GlobalHeader-item">
                <a>
                  <FontAwesomeIcon className="PostList-comment-icon" icon={faSearch} size="1x"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
