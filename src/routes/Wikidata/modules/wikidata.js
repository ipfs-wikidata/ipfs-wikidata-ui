var update = require('react-addons-update');
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'
export const RECEIVE_ENTITY_ERROR = 'RECEIVE_ENTITY_ERROR'
export const REQUEST_CURRENT = 'REQUEST_CURRENT'
export const RECEIVE_CURRENT = 'RECEIVE_CURRENT'

export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE'

const FETCH_STATE_FETCHING = 'FETCHING';
const FETCH_STATE_DONE = 'DONE';
const FETCH_STATE_ERROR = 'ERROR';

// ------------------------------------
// Actions
// ------------------------------------

export function requestEntity (id: string) {
  return {
    type: REQUEST_ENTITY,
    payload: {
      id
    }
  }
}

export function receiveEntity (id: string, json: string) {
  return {
    type: RECEIVE_ENTITY,
    payload: {
      id,
      json
    }
  }
}

export function receiveEntityError (id: string, error) {
  return {
    type: RECEIVE_ENTITY_ERROR,
    payload: {
      id,
      error
    }
  }
}

export function requestCurrent (id: string) {
  return {
    type: REQUEST_CURRENT,
    payload: {
      id
    }
  }
}

export function receiveCurrent (id: string, json: string) {
  return {
    type: RECEIVE_CURRENT,
    payload: {
      id,
      json
    }
  }
}

export function updateLanguage (id: string) {
  return {
    type: UPDATE_LANGUAGE,
    payload: {
      id,
    }
  }
}

function idPath(id: string): string {
  let parts = id.match(/.{1,3}/g);
  let path = parts.join('/');
  return path;
}

function filterUnfetched(unfetched_entities, fetch_states) {
  let realUnfetched = [];
  for (var unfetched of unfetched_entities) {
    if (fetch_states[unfetched] === FETCH_STATE_FETCHING || fetch_states[unfetched] === FETCH_STATE_DONE) {
      continue;
    }
    realUnfetched.push(unfetched);
  }

  return realUnfetched;
}

export const entitiesInItem = (item) => {
    if (!item) { return []; }
    console.log(item);
    let contained_entities = [];
    contained_entities = contained_entities.concat(Object.keys(item.claims));

    return contained_entities;
}

export const fetchEntity = (id: string, ipfs_gateway: string, root_hash: string): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestEntity(id))

    return fetch(ipfs_gateway + root_hash + idPath(id) + '.json')
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(error => dispatch(receiveEntityError(id, error)))
      .then(text => dispatch(receiveEntity(id, text)))
  }
}

export const fetchCurrent = (id: string, ipfs_gateway: string, root_hash: string): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestCurrent(id))

    return fetch(ipfs_gateway + root_hash + idPath(id) + '.json')
      .then(data => data.json())
      .then(text => dispatch(receiveCurrent(id, text)))
  }
}

export const handleLanguageChanged = (_event, _key, payload) => {
  return (dispatch: Function) => {
    console.log(payload);
    dispatch(updateLanguage(payload))
  }
}

export const actions = {
  requestEntity,
  receiveEntity,
  receiveEntityError,
  fetchEntity,
  requestCurrent,
  receiveCurrent,
  fetchCurrent,
  handleLanguageChanged
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_CURRENT]: (state) => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_CURRENT]: (state, action) => {
    let received_entity = action.payload.json;
    let entity = {};
    entity[received_entity.id] = received_entity;
    var new_entities = update(state.entities, {$merge: entity});

    let contained_entities = entitiesInItem(received_entity);

    let unfetched_entities = state.unfetched_entities;
    for (var child_entity of contained_entities) {
      unfetched_entities.push(child_entity);
    }

    unfetched_entities = filterUnfetched(unfetched_entities, state.entity_fetch_states);

    return ({ ...state, entities: new_entities, current: action.payload.id, fetching: false, unfetched_entities: unfetched_entities })
  },
  [REQUEST_ENTITY]: (state, action) => {
    // TODO: refetch if fetch_state is ERROR
    if ((action.payload.id in state.entity_fetch_states) || (action.payload.id in state.entities)) {
      return state;
    }

    let entity_fetch_state = {};
    entity_fetch_state[action.payload.id] = FETCH_STATE_FETCHING;
    var new_fetch_states = update(state.entity_fetch_states, {$merge: entity_fetch_state});

    return ({ ...state, entity_fetch_states: new_fetch_states })
  },
  [RECEIVE_ENTITY]: (state, action) => {
    console.log('received ' + action.payload.id);

    let entity = {};
    entity[action.payload.json.id] = action.payload.json;
    var new_entities = update(state.entities, {$merge: entity});

    let entity_fetch_state = {};
    entity_fetch_state[action.payload.json.id] = FETCH_STATE_DONE;
    var new_fetch_states = update(state.entity_fetch_states, {$merge: entity_fetch_state});

    let unfetched_entities = filterUnfetched(state.unfetched_entities, new_fetch_states);

    return ({ ...state, entities: new_entities, entity_fetch_states: new_fetch_states, unfetched_entities: unfetched_entities })
  },
  [RECEIVE_ENTITY_ERROR]: (state, action) => {
    console.log(action.payload.error);

    let entity_fetch_state = {};
    entity_fetch_state[action.payload.id] = FETCH_STATE_ERROR;
    var new_fetch_states = update(state.entity_fetch_states, {$merge: entity_fetch_state});

    return ({ ...state, entity_fetch_states: new_fetch_states })
  },
  [UPDATE_LANGUAGE]: (state, action) => {
    console.log(action);
    let settings = update(state.settings, {$merge: { ui_language: action.payload.id }});
    return ({ ...state, settings: settings })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  settings: {
    // TODO: get local to work 'http://localhost:8080'
    // ipfs_gateway: 'http://gateway.ipfs.io',
    ipfs_gateway: 'http://127.0.0.1:8080',
    // some old root Qmd2JShnowEtYQyS2o1Zk8ke4hw1YjsYdCm1G6Pa67UknP
    // current root Qmccat9rJ33pom4NdHWkoN41vgDahXQBWpm87rMvuGi6Wo
    root_hash: '/ipfs/Qmccat9rJ33pom4NdHWkoN41vgDahXQBWpm87rMvuGi6Wo/',
    ui_language: 'en-gb',
  },

  current: null,
  fetching: false,
  entity_fetch_states: {},
  entities: {},

  unfetched_entities: [],
}
export default function wikidataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
