import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class WikibaseItemSnak extends React.Component {
  render() {
    var entity = "Q" + this.props.snak.datavalue.value["numeric-id"];
    var value_label = this.props.entities[entity].label;

    return (
      <Card>
        <CardText>
            <label>
              {
                /* TODO: make clickable */
                (value_label)
              }
            </label>
        </CardText>
      </Card>
    );
  }
}

WikibaseItemSnak.propTypes = {
  snak: React.PropTypes.object.isRequired,

  entities: React.PropTypes.object.isRequired,
}

export default WikibaseItemSnak
