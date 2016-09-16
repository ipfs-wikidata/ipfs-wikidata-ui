import React from 'react'

import {Card, CardText} from 'material-ui/Card';

class WikibaseItemSnak extends React.Component {
  render() {
    var entity = "Q" + this.props.snak.datavalue.value["numeric-id"];

    const entity_fetch_state = this.props.entity_fetch_states[entity];
    const entity_fetching = (entity_fetch_state === 'FETCHING');
    const entity_error = (entity_fetch_state === 'ERROR');

    const label_color = entity_fetching ? '#C3C3C3' : (entity_error ? '#C3C3C3' : '');
    // var value_label = this.props.entities[entity].label;

    return (
      <Card>
        <CardText>
            <label style={{color: label_color}}>
              {
                (( entity_fetching ) ?
                    'Loading...' :
                   entity_error ?
                    '---' :
                    <div>
                    {
                      /* TODO: make clickable */
                      (this.props.entities[entity].label)
                    }
                    </div>
                 )
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
  entity_fetch_states: React.PropTypes.object.isRequired,
}

export default WikibaseItemSnak
