import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class MonolingualTextSnak extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
            <label>
              {
                /* TODO display language */
                (this.props.snak.datavalue.value.text)
              }
            </label>
        </CardText>
      </Card>
    );
  }
}

MonolingualTextSnak.propTypes = {
  snak: React.PropTypes.object.isRequired,
}

export default MonolingualTextSnak
