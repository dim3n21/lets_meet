import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import {openModal} from '../../modals/modalActions';

const MapStateToProps = (state) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile
})

const mapDispatchToProps = {
      openModal
}

class NavBar extends Component {

      handleSignIn = () => {
            this.props.openModal('LoginModal');
      }

      handleRegister = () => {
            this.props.openModal('RegisterModal');
      }

      handleSignOut = () => {
            this.props.firebase.logout();
            this.props.history.push('/');
      }

      render() {
            const {auth, profile} = this.props;
            const authenticated = auth.isLoaded && !auth.isEmpty;
            return (
                  <div>
                        <Menu inverted fixed="top">
                              <Container>
                                    <Menu.Item as={NavLink} exact to="/" header>
                                          <img src="assets/logo.png" alt="logo" />
                                          Let's Meet
                                    </Menu.Item>
                                    <Menu.Item exact as={NavLink} to='/events' name="Events" />
                                    {authenticated && 
                                          <Fragment>
                                                <Menu.Item
                                                      as={NavLink}
                                                      to='/people'
                                                      name="People" />
                                                <Menu.Item>
                                                      <Button
                                                            as={Link}
                                                            to="/createEvent"
                                                            floated="right"
                                                            inverted
                                                            content="Create Event" />
                                                </Menu.Item>
                                          </Fragment>
                                    }
                              { authenticated ?
                                    <SignedInMenu signOut={this.handleSignOut} profile={profile} /> 
                                    :
                                    <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} /> }
                              </Container>
                        </Menu>
                  </div>
            );
      }
}

export default withRouter(withFirebase(connect(MapStateToProps, mapDispatchToProps)(NavBar)));