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
  isPosting: false,
  isFetching: false,
  isUpdating: false,
  error: null,

  designs: [],
  tmp: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_DESIGN_REQUEST:
      return {...state, isPosting: true}
    case POST_DESIGN_SUCCESS:
      return {...state, isPosting: false, tmp: action.data}
    case POST_DESIGN_FAILURE:
      return {...state, isPosting: false, error: action.error}
    case FETCH_DESIGNS_REQUEST:
      return {...state, isFetching: true}
    case FETCH_DESIGNS_SUCCESS:
      return {...state, isFetching: false, designs: action.data}
    case FETCH_DESIGNS_FAILURE:
      return {...state, isFetching: false, error: action.error}
    case FETCH_DESIGN_REQUEST:
      return {...state, isFetching: true}
    case FETCH_DESIGN_SUCCESS:
      return {...state, isFetching: false, tmp: action.data}
    case FETCH_DESIGN_FAILURE:
      return {...state, isFetching: false, error: action.error}
    default:
      return state
  }
}

