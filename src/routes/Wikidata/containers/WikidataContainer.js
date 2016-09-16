import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'
import { fetchEntity, fetchCurrent, handleLanguageChanged, handleSaveSettings } from '../modules/wikidata'
import { entitiesInItem } from '../modules/wikidata'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the wikidata:   */

import Wikidata from 'components/Wikidata'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  fetchEntity,
  fetchCurrent,
  handleLanguageChanged,
  handleSaveSettings,
}


const mapStateToProps = (state) => ({
  settings: state.wikidata.settings,

  current: state.wikidata.current,

  entities: getContainedEntities(state),
  entity_fetch_states: state.wikidata.entity_fetch_states,

  unfetched_entities: state.wikidata.unfetched_entities,
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const wikidata = (state) => state.wikidata
    const tripleCount = createSelector(wikidata, (count) => count * 3)
    const mapStateToProps = (state) => ({
      wikidata: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Wikidata)


export const getLocalizedEntities = createSelector(
  [
    state => state.wikidata.settings.ui_language,
    state => state.wikidata.entities,
  ],
  (language, org_entities) => {
    var entities = {};
    for(var entity_id in org_entities) {
      var org_entity = org_entities[entity_id];
      var entity = Object.assign({}, org_entity);

      entity.labels = undefined;
      entity.label = (org_entity['labels'][language] || { value: '<No translation availabe>' })['value'];

      entity.descriptions = undefined;
      entity.description = (org_entity['descriptions'][language] || { value: '<No translation availabe>' })['value'];

      entities[entity_id] = entity;
    }

    return entities;
  }
)

export const getCurrentEntity = createSelector(
  [
    state => state.wikidata.current,
    state => state.wikidata.entities,
  ],
  (current, org_entities) => {
    return org_entities[current];
  }
)

export const getEntitiesInCurrent = createSelector(
  [
    state => state.wikidata.current,
    getCurrentEntity,
  ],
  (current_id, currentEntity) => {
    var contained_entities = entitiesInItem(currentEntity);
    contained_entities.push(current_id);

    return contained_entities;
  }
)

export const getContainedEntities = createSelector(
  [
    getEntitiesInCurrent,
    getLocalizedEntities,
  ],
  (contained_entities, org_entities) => {
    var entities = {};
    for(var entity_id in org_entities) {
      if (contained_entities.includes(entity_id)) {
        var org_entity = org_entities[entity_id];
        var entity = Object.assign({}, org_entity);
        entities[entity_id] = entity;
      }
    }

    return entities;
  }
)
