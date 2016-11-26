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
  designer: {}, // The 'designer' object of current user
  designers: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BECOME_DESIGNER_REQUEST:
      return {...state}
    case BECOME_DESIGNER_SUCCESS:
      return {...state, designer: action.data}
    case BECOME_DESIGNER_FAILURE:
      return {...state}
    case FETCH_DESIGNERS_REQUEST:
      return {...state}
    case FETCH_DESIGNERS_SUCCESS:
      return {...state, designers: action.data}
    case FETCH_DESIGNERS_FAILURE:
      return {...state}
    case FETCH_DESIGNER_REQUEST:
      return {...state}
    case FETCH_DESIGNER_SUCCESS:
      return {...state}
    case FETCH_DESIGNER_FAILURE:
      return {...state}
    default:
      return state
  }
}

