import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import cuid from 'cuid';
import {updateEvent, createEvent} from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';



const mapStateToProps = (state, ownProps) => {
      const eventId = ownProps.match.params.id;

      let event = {
            title: '',
            date: '',
            city: '',
            venue: '',
            hostedBy: ''
      };

      if (eventId && state.events.length > 0) {
            event = state.events.filter( event => event.id === eventId)[0];
      }

      return {
            event
      }
}

const mapDispatchToProps = {
      updateEvent,
      createEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {

      state = {
           ...this.props.event
          }

      handleFormSubmit = e => {
            e.preventDefault();
            if (this.state.id) {
                  this.props.updateEvent(this.state);
                  this.props.history.push(`/events/${this.state.id}`);
            } else {
                  const newEvent = {
                        ...this.state,
                        id: cuid(),
                        hostPhotoURL: '/assets/user.png'
                  }
                  this.props.createEvent(newEvent);
                  this.props.history.push(`/events/events`);
            }
            
      }
      
      render() {
            return (
                  <Grid>
                        <Grid.Column width={10}>
                              <Segment>
                                    <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
                                          <Header sub color='green' content='Event Details' />
                                          <Form onSubmit={this.handleFormSubmit} autoComplete="off">
                                                <Field
                                                      name="title"
                                                      component={TextInput}
                                                      placeholder="Event Name" />
                                                
                                                <Field
                                                      name="category"
                                                      component={SelectInput}
                                                      options={category} 
                                                      placeholder="Event Category" />
                                          
                                                <Field
                                                      name="description"
                                                      component={TextArea}
                                                      rows={3}
                                                      placeholder="Event Decription" />
                                                
                                                <Header
                                                      sub color='green'
                                                      content='Event Location Details' />
                                                
                                                <Field
                                                      name="city"
                                                      component={TextInput}
                                                      placeholder="Event City" />
                                                
                                                <Field
                                                      name="venue"
                                                      component={TextInput}
                                                      placeholder="Event Venue" />
                                                
                                                <Field
                                                      name="date"
                                                      component={TextInput}
                                                      placeholder="Event Date" />
                                                
                                                <Button
                                                      positive
                                                      type="submit">
                                                            Submit 
                                                </Button>
                                                
                                                <Button
                                                      type="button"
                                                      onClick={this.props.history.goBack}>
                                                            Cancel
                                                </Button>
                                          </Form>
                                    </Form>
                              </Segment>
                        </Grid.Column>
                  </Grid>
                  
            );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'eventForm'})(EventForm));