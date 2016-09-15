import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class StringSnak extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
            <label>
              {
                (this.props.snak.datavalue.value)
              }
            </label>
        </CardText>
      </Card>
    );
  }
}

StringSnak.propTypes = {
  snak: React.PropTypes.object.isRequired,
}

export default StringSnak
