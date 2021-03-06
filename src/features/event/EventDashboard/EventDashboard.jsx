import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';

import { createEvent, deleteEvent, updateEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../eventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapStateToProps = (state) => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
})

const mapDispatchToProps = {
  createEvent,
  deleteEvent,
  updateEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {  
  const {events, loading} = this.props;
    if (loading) return <LoadingComponent />
    return (
        <div>
              <Grid>
                    <Grid.Column width={10}>
                          <EventList
                            events={events}
                            deleteEvent={this.handleDeleteEvent} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                          <EventActivity />
                    </Grid.Column>
              </Grid>
        </div>
        );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (firestoreConnect([{collection: 'events'}]) (EventDashboard));