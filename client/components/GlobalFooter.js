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

export default class GlobalFooter extends Component {
  render() {
    return (
      <div className="globalfooter" style={{marginTop: '250px'}}>
        <footer id="footer">
          <Container style={{backgroundColor: '#dddddd', paddingTop: '80px', paddingBottom: '80px'}} fluid textAlign="center">
            <a href="/"><Image src="https://cdn.shopify.com/s/files/1/1564/6971/t/3/assets/site-logo-gray-sw.png?15220522025301450088" alt="Sweat logo" size="small" centered/></a>
            <span className="copyright" style={{color: '#b2b2b2'}}>© Sweat Pty Ltd 2018</span>
          </Container>


{/*          <div class="row container">
            <div class="medium-4 columns show-for-medium">
              <div class="brand">
                <a href="/"><img src="https://cdn.shopify.com/s/files/1/1564/6971/t/3/assets/site-logo-gray-sw.png?15220522025301450088" alt="Sweat logo"/></a>
                <h2>The World's Biggest <br></br>Female Fitness Community</h2>
                <div class="social-links">
                  <a target="_blank" href="https://www.facebook.com/Sweat-763671557066427"><i class="fa fa-facebook-square"></i></a>
                  <a target="_blank" href="https://www.instagram.com/sweat/"><i class="fa fa-instagram"></i></a>
                  <a target="_blank" href="https://twitter.com/sweat"><i class="fa fa-twitter"></i></a>
                </div>
              </div>
            </div>
            <div class="medium-2 columns show-for-medium">
              <h3>Sweat</h3>
              <ul class="list-unstyled">
                <li><a target="_blank" href="https://www.sweat.com/blog">BLOG</a></li>
                <li><a target="_blank" href="http://forum.sweat.com">FORUM</a></li>
                <li><a target="_blank" href="https://sweat.zendesk.com/hc/en-us/requests/new">CONTACT</a></li>
              </ul>
            </div>
            <div class="medium-2 columns show-for-medium">
              <h3>Resources</h3>
              <ul class="list-unstyled">
                <li><a target="_blank" href="https://join.sweat.com/{{currentUser.locale}}/privacy-policy">POLICY</a></li>
                <li><a target="_blank" href="https://join.sweat.com/{{currentUser.locale}}/terms-of-service">TERMS OF SERVICE</a></li>
                <li><a target="_blank" href="https://join.sweat.com/{{currentUser.locale}}/billing-terms">BILLING TERMS</a></li>
              </ul>
            </div>
            <div class="medium-4 columns show-for-medium text-right">
              <a class="button hollow gray-light font-bold" target="_blank" href="https://sweat.zendesk.com/hc/en-us/categories/115000930108-Sweat">SUPPORT</a>
            </div>
            <div class="small-12 columns hide-for-medium">
              <div class="footer-mobile">
                <div class="footer-menus">
                  <a target="_blank" href="https://www.sweat.com/blog">BLOG<i class="fa fa-angle-right"></i></a>
                  <a target="_blank" href="http://forum.sweat.com">FORUM<i class="fa fa-angle-right"></i></a>
                  <a target="_blank" href="https://sweat.zendesk.com/hc/en-us/requests/new">CONTACT<i class="fa fa-angle-right"></i></a>
                  <a target="_blank" href="https://join.sweat.com/en/privacy-policy">POLICY<i class="fa fa-angle-right"></i></a>
                  <a target="_blank" href="https://join.sweat.com/en/terms-of-service">TERMS OF SERVICE<i class="fa fa-angle-right"></i></a>
                  <a target="_blank" href="https://join.sweat.com/en/billing-terms">BILLING TERMS<i class="fa fa-angle-right"></i></a>
                </div>
                <div class="social-links">
                  <a target="_blank" href="https://www.facebook.com/Sweat-763671557066427"><i class="fa fa-facebook-square"></i></a>
                  <a target="_blank" href="https://www.instagram.com/sweat/"><i class="fa fa-instagram"></i></a>
                  <a target="_blank" href="https://twitter.com/sweat"><i class="fa fa-twitter"></i></a>
                  <h2 class="small-margin-top-10">The World's Biggest Female Fitness Community</h2>
                </div>
              </div>
            </div>
          </div>*/}
          
        </footer>
      </div>
    )
  }
}
