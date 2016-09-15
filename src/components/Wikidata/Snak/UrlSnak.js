import React from 'react'

import {Card, CardText} from 'material-ui/Card';
import ContentLinkIcon from 'material-ui/svg-icons/content/link';

class UrlSnak extends React.Component {
  render() {
    return (
      <Card>
        <CardText>
              {
                <a href={this.props.snak.datavalue.value}>
                  {(this.props.snak.datavalue.value)}
                </a>
                /* TODO add link icon */
              }
            {/*<ContentLinkIcon/>*/}
        </CardText>
      </Card>
    );
  }
}

UrlSnak.propTypes = {
  snak: React.PropTypes.object.isRequired,
}

export default UrlSnak
