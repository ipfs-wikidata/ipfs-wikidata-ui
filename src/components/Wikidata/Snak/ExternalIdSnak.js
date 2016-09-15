import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class ExternalIdSnak extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
            <label>
              {
                /* TODO use formating to get clickable url */
                (this.props.snak.datavalue.value)
              }
            </label>
        </CardText>
      </Card>
    );
  }
}

ExternalIdSnak.propTypes = {
  snak: React.PropTypes.object.isRequired,
}

export default ExternalIdSnak
