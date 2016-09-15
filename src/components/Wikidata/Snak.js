import React from 'react'

import ExternalIdSnak from './Snak/ExternalIdSnak'
import MonolingualTextSnak from './Snak/MonolingualTextSnak'
import StringSnak from './Snak/StringSnak'
import UrlSnak from './Snak/UrlSnak'

import UnsupportedSnak from './Snak/UnsupportedSnak'

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
}

export default Snak
