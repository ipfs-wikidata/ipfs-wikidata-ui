import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import classes from './Wikidata.scss'

import Header from '../Header/Header'
import Claim from './Claim'

export class Wikidata extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      for (var unfetched of nextProps.unfetched_entities) {
        this.props.fetchEntity(unfetched, this.props.settings.ipfs_gateway, this.props.settings.root_hash)
      }
    }
  }

  render() {
    return (
      <div>
      <MuiThemeProvider>
        <Header
          settings={this.props.settings}
          handleSaveSettings={this.props.handleSaveSettings}
        />
      </MuiThemeProvider>

      <MuiThemeProvider>
      <div style={{
        "maxWidth": "70%",
        "margin": "auto"
      }}>
        <h2 className={classes.wikidataContainer}>
          Wikidata:
          {' '}
          <span className={classes['wikidata--green']}>
            {this.props.wikidata}
          </span>
        </h2>
        <br/>
        <br/>
        <button className='btn btn-default' onClick={this.props.fetchCurrent.bind(this, 'Q42', this.props.settings.ipfs_gateway, this.props.settings.root_hash)}>
          Douglas Adams
        </button>
        {' '}
        <button className='btn btn-default' onClick={this.props.fetchCurrent.bind(this, 'Q43', this.props.settings.ipfs_gateway, this.props.settings.root_hash)}>
          Turkey
        </button>
        <Card>
          <CardTitle title={(this.props.entities[this.props.current] || { label: "-"} ).label + " - " + (this.props.entities[this.props.current] || { label: "-"} ).description} subtitle={"Item - " + (this.props.current || "?")} />
          <CardText>
        {
          ((this.props.entities[this.props.current]) ?
            (Object.values(this.props.entities[this.props.current].claims).map((claims) => (
              <Claim claims={claims} entities={(this.props.entities)} entity_fetch_states={(this.props.entity_fetch_states)} />
            )))
            : 'No claims'
          )
        }
          </CardText>
        </Card>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}

Wikidata.propTypes = {
  language: React.PropTypes.string,
  settings: React.PropTypes.object.isRequired,

  current: React.PropTypes.string,
  entities: React.PropTypes.object.isRequired,
  entity_fetch_states: React.PropTypes.object.isRequired,

  fetchEntity: React.PropTypes.func.isRequired,
  fetchCurrent: React.PropTypes.func.isRequired,
  handleLanguageChanged: React.PropTypes.func.isRequired,
  handleSaveSettings: React.PropTypes.func.isRequired,

  unfetched_entities: React.PropTypes.array,
}

export default Wikidata
