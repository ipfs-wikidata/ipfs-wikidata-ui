import React from 'react'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import Snak from './Snak'

class Claim extends React.Component {
  render() {
    const mainsnak = this.props.claim.mainsnak;

    return (
      <Snak snak={mainsnak} entities={this.props.entities} entity_fetch_states={this.props.entity_fetch_states} />
    );
  }
}

Claim.propTypes = {
  claim: React.PropTypes.object.isRequired,

  entities: React.PropTypes.object.isRequired,
  entity_fetch_states: React.PropTypes.object.isRequired,
}

export default Claim
