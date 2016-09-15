import React from 'react'

import StringSnak from './Snak/StringSnak'

class Snak extends React.Component {
  render() {
    switch(this.props.snak.datatype) {
        case "string":
          return (
            <StringSnak snak={this.props.snak} />
          );
          break;
        default:
          return (
            <div>
              Unsupported datatype.
            </div>
          );
          break;
    }
  }
}

Snak.propTypes = {
  snak: React.PropTypes.object.isRequired,
}

export default Snak
