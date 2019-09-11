import React, {useState} from 'react';
import { Grid, Icon, Button, Segment } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import { format, parseISO } from 'date-fns';

const EventDetailedInfo = ({event}) => {
      const [isMapOpen, showMapToggle] = useState(false)
      return (
               <Segment.Group>
                  <Segment attached="top">
                    <Grid>
                      <Grid.Column width={1}>
                        <Icon size="large" color="green" name="info" />
                      </Grid.Column>
                      <Grid.Column width={15}>
                        <p>{event.description}</p>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <Segment attached>
                    <Grid verticalAlign="middle">
                      <Grid.Column width={1}>
                        <Icon name="calendar" size="large" color="green" />
                      </Grid.Column>
                      <Grid.Column width={15}>
                        {event.date &&
                        <span>
                          {format(parseISO(event.date), 'EEEE do LLL')} at {' '}
                          {format(parseISO(event.date), 'h:mm a')}
                        </span>}
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <Segment attached>
                    <Grid verticalAlign="middle">
                      <Grid.Column width={1}>
                        <Icon name="marker" size="large" color="green" />
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <span>{event.venue}</span>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Button
                          onClick={() => showMapToggle(!isMapOpen)}
                          color="green" size="tiny"
                          content={isMapOpen ? "Hide Map" : "Show Map"} />
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  { isMapOpen && <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} /> }
                </Segment.Group>
      );
};

export default EventDetailedInfo;