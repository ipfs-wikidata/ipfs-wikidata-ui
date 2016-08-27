var update = require('react-addons-update');
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'

export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE'
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

export function updateLanguage (id: string) {
  return {
    type: UPDATE_LANGUAGE,
    payload: {
      id,
    }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const fetchEntity = (id: string): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestEntity(id))

    // some old root Qmd2JShnowEtYQyS2o1Zk8ke4hw1YjsYdCm1G6Pa67UknP
    // current root Qmccat9rJ33pom4NdHWkoN41vgDahXQBWpm87rMvuGi6Wo

    // return fetch('http://localhost:8080/ipfs/Qmccat9rJ33pom4NdHWkoN41vgDahXQBWpm87rMvuGi6Wo/' + id + '.json')
    return fetch('http://gateway.ipfs.io/ipfs/Qmccat9rJ33pom4NdHWkoN41vgDahXQBWpm87rMvuGi6Wo/' + id + '.json')
      .then(data => data.json())
      .then(text => dispatch(receiveEntity(id, text)))
  }
}

export const handleLanguageChanged = (event) => {
  return (dispatch: Function) => {
    dispatch(updateLanguage(event.target.value))
  }
}

export const actions = {
  // increment,
  // doubleAsync
  requestEntity,
  receiveEntity,
  fetchEntity,
  handleLanguageChanged
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ENTITY]: (state) => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_ENTITY]: (state, action) => {
    let entity = {};
    entity[action.payload.json.id] = action.payload.json;
    var new_entities = update(state.entities, {$merge: entity});
    return ({ ...state, entities: new_entities, current: action.payload.id, fetching: false })
  },
  [UPDATE_LANGUAGE]: (state, action) => {
    console.log(action);
    return ({ ...state, ui_language: action.payload.id })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  ui_language: 'en-gb',
  entities: {}
}
export default function wikidataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
