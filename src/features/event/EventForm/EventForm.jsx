/* global google */
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { updateEvent, createEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events.length > 0) {
    event = state.firestore.ordered.events.filter(event => event.id === eventId)[0] || {};
  }

  return {
    initialValues: event
  };
};

const mapDispatchToProps = {
  updateEvent,
  createEvent
};

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category title is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter the description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
});

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  };

  async componentDidMount() {
    const { firestore, match, history } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
          //history.push("/events");
          //toastr.error(`Sorry`, `Event not found`);
    } else {
      this.setState({
        venueLatLng: event.data().venueLatLng
      })
    }
}

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;
    try {
      if (this.props.initialValues.id) {
        this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        let createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/events/${createdEvent.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine
    } = this.props;
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form autoComplete="off" onSubmit={this.handleFormSubmit}>
              <Header sub color="green" content="Event Details" />
              <Form
                onSubmit={this.props.handleSubmit(this.onFormSubmit)}
                autoComplete="off"
              >
                <Field
                  name="title"
                  component={TextInput}
                  placeholder="Event Name"
                />

                <Field
                  name="category"
                  component={SelectInput}
                  options={category}
                  placeholder="Event Category"
                />

                <Field
                  name="description"
                  component={TextArea}
                  rows={3}
                  placeholder="Event Decription"
                />

                <Header sub color="green" content="Event Location Details" />

                <Field
                  name="city"
                  component={PlaceInput}
                  options={{ type: ["(cities)"] }}
                  onSelect={this.handleCitySelect}
                  placeholder="Event City"
                />

                <Field
                  name="venue"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ["establishment"]
                  }}
                  onSelect={this.handleVenueSelect}
                  placeholder="Event Venue"
                />

                <Field
                  name="date"
                  component={DateInput}
                  dateFormat="dd LLL yyyy h:mm a"
                  showTimeSelect
                  timeFormat="HH:mm"
                  placeholder="Event Date"
                />

                <Button
                  disabled={invalid || submitting || pristine}
                  positive
                  type="submit"
                >
                  Submit
                </Button>

                <Button
                  type="button"
                  onClick={
                    initialValues.id
                      ? () => history.push(`/events/${initialValues.id}`)
                      : () => history.push("events")
                  }
                >
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

export default withFirestore(connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm", validate, enableReinitialize: true })(EventForm)));
