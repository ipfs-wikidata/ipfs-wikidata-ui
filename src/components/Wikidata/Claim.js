import React from 'react'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import Snak from './Snak'

class Claim extends React.Component {
  render() {
    const entities = this.props.entities;
    const mainsnak = this.props.claim.mainsnak;
    const main_property = mainsnak.property;

    const main_property_fetch_state = this.props.entity_fetch_states[main_property];
    const main_property_fetching = (main_property_fetch_state === 'FETCHING');
    const main_property_error = (main_property_fetch_state === 'ERROR');

    return (
      <Snak snak={mainsnak} />
    );
  }
}

Claim.propTypes = {
  claim: React.PropTypes.object.isRequired,

  entities: React.PropTypes.object.isRequired,
  entity_fetch_states: React.PropTypes.object.isRequired,
}

export default Claim
