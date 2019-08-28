import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
      render() {
            const {attendee} = this.props
            console.log(attendee)
            return (
                  <List.Item>
                        <Image as='a' size='mini' circular src={attendee.photoURL} />
                  </List.Item>
            );
      }
}

export default EventListAttendee;