import React, { Component } from 'react';
import cuid from 'cuid';
import { connect } from 'react-redux';

import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

import { createEvent, deleteEvent, updateEvent } from '../eventActions';

const mapStateToProps = (state) => ({
  events: state.events
})

const mapDispatchToProps = {
  createEvent,
  deleteEvent,
  updateEvent
}


class EventDashboard extends Component {

  state = {
    isOpen: false,
    selectedEvent: null
  }

  // handleIsOpenToggle = () => {
  //   this.setState({
  //     ...this.state,
  //     isOpen: !this.state.isOpen
  //   })
  // }

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    })
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    })
  };

  handleSelectEvent = (event) => {
    this.setState({
      isOpen: true,
      selectedEvent: event
    })
  };

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  };

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  
  

  render() {  
  const {isOpen, selectedEvent} = this.state;
  const {events} = this.props;
    return (
        <div>
              <Grid>
                    <Grid.Column width={10}>
                          <EventList
                            events={events}
                            selectEvent={this.handleSelectEvent}
                            deleteEvent={this.handleDeleteEvent} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                          <Button
                            onClick={this.handleCreateFormOpen}
                            color="green"
                            positive                              
                            content="Create Event" />
                          {isOpen && <EventForm
                            key={selectedEvent ? selectedEvent.id : 0}
                            updateEvent={this.handleUpdateEvent}
                            selectedEvent={selectedEvent}
                            createEvent={this.handleCreateEvent}
                            cancelFormOpen={this.handleFormCancel} /> }
                    </Grid.Column>
              </Grid>
        </div>
        );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);