import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';

import classes from './Wikidata.scss'

import Header from '../Header/Header'
import Claims from './Claims'

export class Wikidata extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text_field_value: 'Q42',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      for (var unfetched of nextProps.unfetched_entities) {
        this.props.fetchEntity(unfetched, this.props.settings.ipfs_gateway, this.props.settings.root_hash)
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      text_field_value: event.target.value,
    });
  };

  handleOnKeyDown = (event) => {
    if (event.keyCode === 13) { // Enter keypress
      this.props.fetchCurrent(this.state.text_field_value, this.props.settings.ipfs_gateway, this.props.settings.root_hash);
    }
  };

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
        <TextField
          id="entity_id_field"
          value={this.state.text_field_value}
          onChange={this.handleChange}
          onKeyDown={this.handleOnKeyDown}
        />
        <Card>
          <CardTitle title={(this.props.entities[this.props.current] || { label: "-"} ).label + " - " + (this.props.entities[this.props.current] || { label: "-"} ).description} subtitle={"Item - " + (this.props.current || "?")} />
          <CardText>
        {
          ((this.props.entities[this.props.current]) ?
            (Object.values(this.props.entities[this.props.current].claims).map((claims) => (
              <Claims claims={claims} entities={(this.props.entities)} entity_fetch_states={(this.props.entity_fetch_states)} />
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
