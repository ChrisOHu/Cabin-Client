import {
  POST_DESIGN_REQUEST,
  POST_DESIGN_SUCCESS,
  POST_DESIGN_FAILURE,
  FETCH_DESIGNS_REQUEST,
  FETCH_DESIGNS_SUCCESS,
  FETCH_DESIGNS_FAILURE,
  FETCH_DESIGN_REQUEST,
  FETCH_DESIGN_SUCCESS,
  FETCH_DESIGN_FAILURE
} from '../actions/designs'

const initialState = {
  designs: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_DESIGN_REQUEST:
      return {...state}
    case POST_DESIGN_SUCCESS:
      return {...state}
    case POST_DESIGN_FAILURE:
      return {...state}
    case FETCH_DESIGNS_REQUEST:
      return {...state}
    case FETCH_DESIGNS_SUCCESS:
      return {...state, designs: action.data}
    case FETCH_DESIGNS_FAILURE:
      return {...state}
    case FETCH_DESIGN_REQUEST:
      return {...state}
    case FETCH_DESIGN_SUCCESS:
      return {...state}
    case FETCH_DESIGN_FAILURE:
      return {...state}
    default:
      return state
  }
}

