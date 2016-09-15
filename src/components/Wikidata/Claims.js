import React from 'react'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import Claim from './Claim'

class Claims extends React.Component {
  render() {
    const entities = this.props.entities;
    const mainsnak = this.props.claims[0].mainsnak;
    const main_property = mainsnak.property;

    const main_property_fetch_state = this.props.entity_fetch_states[main_property];
    const main_property_fetching = (main_property_fetch_state === 'FETCHING');
    const main_property_error = (main_property_fetch_state === 'ERROR');

    return (
        <Card>
          <CardTitle
            title={(main_property_fetching ?
                      'Loading...' :
                    main_property_error ?
                      'Error while fetching :(' :
                      entities[main_property].label)}
            subtitle={"Property - " + (main_property)} />
          {
            (( main_property_fetching ) ?
              <LinearProgress mode="indeterminate" /> : '' )
          }
          <CardText>
              <label style={{color: '#C3C3C3'}}>
                {
                  (( main_property_fetching ) ?
                      'Loading...' :
                     main_property_error ?
                      '---' :
                      <div>
                      {
                        (Object.values(this.props.claims).map((claim) => (
                          <Claim claim={claim} entities={this.props.entities} entity_fetch_states={this.props.entity_fetch_states} />
                        )))
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

Claims.propTypes = {
  claims: React.PropTypes.array.isRequired,

  entities: React.PropTypes.object.isRequired,
  entity_fetch_states: React.PropTypes.object.isRequired,
}

export default Claims
