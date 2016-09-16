import React from 'react'

import ExternalIdSnak from './snak/ExternalIdSnak'
import MonolingualTextSnak from './snak/MonolingualTextSnak'
import StringSnak from './snak/StringSnak'
import UrlSnak from './snak/UrlSnak'
import WikibaseItemSnak from './snak/WikibaseItemSnak'

import UnsupportedSnak from './snak/UnsupportedSnak'

class Snak extends React.Component {
  render() {
    switch(this.props.snak.datatype) {
        case "external-id":
          return (
            <ExternalIdSnak snak={this.props.snak} />
          );
          break;
        case "monolingualtext":
          return (
            <MonolingualTextSnak snak={this.props.snak} />
          );
          break;
        case "string":
          return (
            <StringSnak snak={this.props.snak} />
          );
          break;
        case "url":
          return (
            <UrlSnak snak={this.props.snak} />
          );
          break;
        case "wikibase-item":
          return (
            <WikibaseItemSnak snak={this.props.snak} entities={this.props.entities} entity_fetch_states={this.props.entity_fetch_states} />
          );
          break;
        default:
          return (
            <UnsupportedSnak />
          );
          break;
          break;
    }
  }
}

Snak.propTypes = {
  snak: React.PropTypes.object.isRequired,

  entities: React.PropTypes.object.isRequired,
  entity_fetch_states: React.PropTypes.object.isRequired,
}

export default Snak
