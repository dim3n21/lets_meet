import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class EventDashboard extends Component {
      render() {
            return (
                  <div>
                        <Grid>
                              <Grid.Column width={10}>
                                    Left Column
                              </Grid.Column>
                              <Grid.Column width={6}>
                                    Right Column
                              </Grid.Column>
                        </Grid>
                  </div>
            );
      }
}

export default EventDashboard;