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
  isPosting: false,
  isFetching: false,
  isUpdating: false,
  error: null,

  homes: [],
  tmp: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_HOME_REQUEST:
      return {...state, isPosting: true}
    case POST_HOME_SUCCESS:
      return {...state, isPosting: false, tmp: action.data}
    case POST_HOME_FAILURE:
      return {...state, isPosting: false, error: action.error}
    case FETCH_HOMES_REQUEST:
      return {...state, isFetching: true}
    case FETCH_HOMES_SUCCESS:
      return {...state, isFetching: false, homes: action.data}
    case FETCH_HOMES_FAILURE:
      return {...state, isFetching: false, error: action.error}
    case FETCH_HOME_REQUEST:
      return {...state, isFetching: true}
    case FETCH_HOME_SUCCESS:
      return {...state, isFetching: false, tmp: action.data}
    case FETCH_HOME_FAILURE:
      return {...state, isFetching: false, error: action.error}
    default:
      return state
  }
}

