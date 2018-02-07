import React, { Component } from 'react';
import { fetchUserInfo } from '../actions';
import './GlobalHeader.css';
import logo from './logo.svg';
import UserPlaceholder from './user_placeholder.svg';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Dropdown, Image, Modal, Button, Header, Segment, Divider, Form, Checkbox} from 'semantic-ui-react';



const Trigger = (props) => {
  return (
    <span>
      <Image avatar src={props.userInfo && props.userInfo.image_url ? props.userInfo.image_url : ''} />
    </span>
  )
}




const LoginModal = (props) => {
  const { formInputOnChangeCallback, formData } = props;
  return (
    <Modal size="tiny" trigger={<span>Log in</span>}>
      <Modal.Content image>
        <Modal.Description>
          <Form onSubmit={(event, data) => {props.submitCallback(event, data)}}>
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
            <Button type="submit" primary fluid>Login</Button>
          </Form>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sign Up Now</Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const DropdownOptions = (submitCallback, formInputOnChangeCallback, formData) => {
  return [
    { key: 'user', value: 'user', text: 'Account', icon: 'user' },
    { key: 'settings', value: 'settings', text: 'Settings', icon: 'settings' },
    { key: 'sign-out', value: 'sign-out', text: 'Sign Out', icon: 'sign out' },
    { key: 'sign-in', value: 'sign-in', text: <LoginModal submitCallback={submitCallback} formInputOnChangeCallback={formInputOnChangeCallback} formData={formData}/>, icon: 'sign in' }
  ]
}

export default class GlobalHeader extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserInfo());
  }
  handleClick(event, data) {
    console.log(data.value)
  }
  submitClick(event,data) {
    console.log(event, data);
  }
  inputOnChange(e, {name, value}) {

  }
  render() {
    const {isFetchingUser, isFetchedUser, info, formInputOnChange, formEmail, formPassword} = this.props;

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
                <Dropdown keeponscreen="true" onChange={(event, data) => {this.handleClick(event, data)}} trigger={<Trigger userInfo={info}/>} options={DropdownOptions(this.submitClick, formInputOnChange, {formEmail: formEmail, formPassword: formPassword})} pointing='top left' icon={null} />
                {/*{heroImageComponent}*/}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
