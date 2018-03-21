import React, { Component } from 'react';
import { 
  Button, 
  Dropdown, 
  Icon, 
  Modal, 
  Image, 
  Header, 
  List,
  Container
} from 'semantic-ui-react';
import './GlobalFooter.sass';

export default class GlobalFooter extends Component {
  render() {
    return (
      <div className="global-footer">
        <footer id="footer">
          <Container className="footer-container" fluid textAlign="center">
            <a href="/">
              <Image src="https://cdn.shopify.com/s/files/1/1564/6971/t/3/assets/site-logo-gray-sw.png?15220522025301450088" alt="Sweat logo" size="small" centered/>
            </a>
            <span className="copyright">© Sweat Pty Ltd 2018</span>
          </Container>
        </footer>
      </div>
    )
  }
}
