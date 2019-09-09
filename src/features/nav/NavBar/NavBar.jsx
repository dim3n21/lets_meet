import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import {openModal} from '../../modals/modalActions';


const actions = {
      openModal
}

class NavBar extends Component {

      state = {
            authenticated: false
      }

      handleSignIn = () => {
            this.props.openModal('LoginModal');
      }

      handleRegister = () => {
            this.props.openModal('RegisterModal');
      }

      handleSignOut = () => {
            this.setState({
                  authenticated: false
            })
            this.props.history.push('/');
      }

      render() {
            const {authenticated} = this.state;
            return (
                  <div>
                        <Menu inverted fixed="top">
                              <Container>
                                    <Menu.Item as={NavLink} exact to="/" header>
                                          <img src="assets/logo.png" alt="logo" />
                                          Let's Meet
                                    </Menu.Item>
                                    <Menu.Item exact as={NavLink} to='/events' name="Events" />
                                    <Menu.Item as={NavLink} to='/people' name="People" />
                                    <Menu.Item>
                                          <Button as={Link} to="/createEvent" floated="right" inverted content="Create Event" />
                                    </Menu.Item>
                              { authenticated ?
                                    <SignedInMenu signOut={this.handleSignOut} /> 
                                    : 
                                    
                                    <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} /> }
                              </Container>
                        </Menu>
                  </div>
            );
      }
}

export default withRouter(connect(null, actions)(NavBar));