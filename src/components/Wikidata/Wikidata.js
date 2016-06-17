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
    <button className='btn btn-default' onClick={props.fetchEntity}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Wikidata.propTypes = {
  // wikidata: React.PropTypes.number.isRequired,
  // doubleAsync: React.PropTypes.func.isRequired,
  fetchEntity: React.PropTypes.func.isRequired
}

export default Wikidata
