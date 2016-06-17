// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_ENTITY = 'REQUEST_ENTITY'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'

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

export function receiveEntity (id: string, text: string) {
  return {
    type: RECEIVE_ENTITY,
    payload: {
      id,
      text
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

    // return fetch('https://api.github.com/zen')
    return fetch('http://localhost:8080/ipfs/QmU6xMi7EY7ah82Y82wqJwD1Poh3Gf7dux1YzsniMVrJDu/' + id + '.json')
      .then(data => data.json())
      .then(text => dispatch(receiveEntity(id, text)))
  }
}

export const actions = {
  // increment,
  // doubleAsync
  requestEntity,
  receiveEntity,
  fetchEntity
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ENTITY]: (state) => {
    return ({ ...state, fetching: true })
  },
  [RECEIVE_ENTITY]: (state, action) => {
    return ({ ...state, entities: state.entities.concat(action.payload), current: action.payload.id, fetching: false })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  entities: []
}
export default function wikidataReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
