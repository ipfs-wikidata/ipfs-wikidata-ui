import React from 'react'
import classes from './Wikidata.scss'

export const Wikidata = (props) => (
  <div>
    <h2 className={classes.wikidataContainer}>
      Wikidata:
      {' '}
      <span className={classes['wikidata--green']}>
        {props.wikidata}
      </span>
    </h2>
    <select onChange={props.handleLanguageChanged.bind()}>
      <option value="en-gb">British English</option>
      <option value="de">German</option>
    </select>
    <br/>
    <br/>
    <button className='btn btn-default' onClick={props.fetchEntity.bind(this, 'Q42')}>
      Douglas Adams
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.fetchEntity.bind(this, 'Q43')}>
      Turkey
    </button>
    <p>
      Label: {(props.entities[props.current] || { label: "-"} ).label}.
    </p>
    <p>Statements:</p>
    {
      ((props.entities[props.current]) ?
        (Object.values(props.entities[props.current].claims).map((claim) => (
          <div style = {{
            "border-style": "solid",
            "border-color": "#4FC3F7"
          }} >
            <p>Property <small>({(claim[0].mainsnak.property)})</small></p>
          </div>
        )))
        : 'No claims'
      )
    }
  </div>
)

Wikidata.propTypes = {
  current: React.PropTypes.string,
  entities: React.PropTypes.object.isRequired,

  fetchEntity: React.PropTypes.func.isRequired,
  handleLanguageChanged: React.PropTypes.func.isRequired
}

export default Wikidata
