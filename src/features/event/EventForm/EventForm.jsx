import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {

      state = {
            title: '',
            date: '',
            city: '',
            venue: '',
            hostedBy: ''
          }

      handleFormSubmit = e => {
            e.preventDefault();
            console.log(this.state);
      }

      handleInputChange = ({target: {name, value}}) => {
            this.setState({
                  [name]: value
            })
      }

      render() {
            const {cancelFormOpen} = this.props;
            const {title, date, city, venue, hostedBy} = this.state;
            return (
                  <Segment>
                        <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
                              <Form.Field>
                                    <label>Event Title</label>
                                    <input 
                                          placeholder="First Name"
                                          name="title"
                                          value={title}
                                          onChange={this.handleInputChange} />
                              </Form.Field>
                              <Form.Field>
                                    <label>Event Date</label>
                                    <input
                                          type="date"
                                          placeholder="Event Date"
                                          name="date"
                                          value={date}
                                          onChange={this.handleInputChange} />
                              </Form.Field>
                              <Form.Field>
                                    <label>City</label>
                                    <input
                                          placeholder="City event is taking place"
                                          name="city"
                                          value={city}
                                          onChange={this.handleInputChange} />
                              </Form.Field>
                              <Form.Field>
                                    <label>Venue</label>
                                    <input
                                          placeholder="Enter the Venue of the event"
                                          name="venue"
                                          value={venue}
                                          onChange={this.handleInputChange} />
                              </Form.Field>
                              <Form.Field>
                                    <label>Hosted By</label>
                                    <input
                                          placeholder="Enter the name of person hosting"
                                          name="hostedBy"
                                          value={hostedBy}
                                          onChange={this.handleInputChange} />
                              </Form.Field>
                              <Button positive type="submit">Submit </Button>
                              <Button type="button" onClick={cancelFormOpen}>Cancel</Button>
                        </Form>
                  </Segment>
            );
      }
}

export default EventForm;