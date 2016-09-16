import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class UnsupportedSnak extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
          <label style={{color: '#C3C3C3'}}>
            Unsupported datatype.
          </label>
        </CardText>
      </Card>
    );
  }
}

UnsupportedSnak.propTypes = {
}

export default UnsupportedSnak
