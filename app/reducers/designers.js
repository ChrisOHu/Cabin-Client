import {
  BECOME_DESIGNER_REQUEST,
  BECOME_DESIGNER_SUCCESS,
  BECOME_DESIGNER_FAILURE,
  FETCH_DESIGNERS_REQUEST,
  FETCH_DESIGNERS_SUCCESS,
  FETCH_DESIGNERS_FAILURE,
  FETCH_DESIGNER_REQUEST,
  FETCH_DESIGNER_SUCCESS,
  FETCH_DESIGNER_FAILURE
} from '../actions/designers'

const initialState = {
  isRegistering: false,
  isFetching: false,
  isUpdating: false,
  error: null,

  designer: {}, // The 'designer' object of current user
  designers: [],
  tmp: null // whatever tmp data needed
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BECOME_DESIGNER_REQUEST:
      return {...state, isRegistering: true}
    case BECOME_DESIGNER_SUCCESS:
      return {...state, isRegistering: false, designer: action.data}
    case BECOME_DESIGNER_FAILURE:
      return {...state, isRegistering: false, error: action.error}
    case FETCH_DESIGNERS_REQUEST:
      return {...state, isFetching: true}
    case FETCH_DESIGNERS_SUCCESS:
      return {...state, isFetching: false, designers: action.data}
    case FETCH_DESIGNERS_FAILURE:
      return {...state, isFetching: false, error: action.error}
    case FETCH_DESIGNER_REQUEST:
      return {...state, isFetching: true, tmp: null}
    case FETCH_DESIGNER_SUCCESS:
      return {...state, isFetching: false, tmp: action.data}
    case FETCH_DESIGNER_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

