import {
  POST_HOME_REQUEST,
  POST_HOME_SUCCESS,
  POST_HOME_FAILURE,
  FETCH_HOMES_REQUEST,
  FETCH_HOMES_SUCCESS,
  FETCH_HOMES_FAILURE,
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE
} from '../actions/homes'

const initialState = {
  homes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_HOME_REQUEST:
      return {...state}
    case POST_HOME_SUCCESS:
      return {...state}
    case POST_HOME_FAILURE:
      return {...state}
    case FETCH_HOMES_REQUEST:
      return {...state}
    case FETCH_HOMES_SUCCESS:
      return {...state, homes: action.data}
    case FETCH_HOMES_FAILURE:
      return {...state}
    case FETCH_HOME_REQUEST:
      return {...state}
    case FETCH_HOME_SUCCESS:
      return {...state}
    case FETCH_HOME_FAILURE:
      return {...state}
    default:
      return state
  }
}

