import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {openModal} from '../modals/modalActions';




const actions = {
      openModal
}

class TestComponents extends Component {

      render() {
            const {openModal} = this.props
            return (
                  <div>
                        <Button onClick={() => {openModal('TestModal', {data: 42})}} color='teal' content='open modal' />
                  </div>
            );
      }
}

export default connect(null, actions)(TestComponents);