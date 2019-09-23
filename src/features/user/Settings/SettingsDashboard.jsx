import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Route, Redirect, Switch } from 'react-router-dom';

import SettingsNav from '../Settings/SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import { updatePassword } from '../../auth/authAction';

const actions = {
      updatePassword
};
    
const mapState = state => ({
      providerId: state.firebase.auth.providerData[0].providerId,
      user: state.firebase.profile
});


const SettingsDashboard = ({updatePassword, providerId, user}) => {

      return (
            <Grid>
                  <Grid.Column width="12">
                        <Switch>
                              <Redirect exact from='/settings' to='/settings/basic' />
                              <Route path='/settings/basic' render={() => <BasicPage initialValues={user} />} />
                              <Route path='/settings/about' component={AboutPage} />
                              <Route path='/settings/photos' component={PhotosPage} />
                              <Route
                              path='/settings/account'
                              render={() => <AccountPage updatePassword={updatePassword} providerId={providerId} />} />
                        </Switch>
                  </Grid.Column>
                  <Grid.Column width="4">
                        <h1><SettingsNav /></h1>
                  </Grid.Column>
            </Grid>
      );
};

export default connect(
      mapState,
      actions
    )(SettingsDashboard);;