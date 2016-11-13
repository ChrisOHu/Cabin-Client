import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/homes'

const initialState = {
  searching: false,
  searchError: {
    message: null
  },
  searchResults: [
  ]
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return {
        ...state,
        searching: true,
        searchError: null
      }
    }
    case SEARCH_SUCCESS: {
      return {
        ...state,
        searching: false,
        searchResults: action.results
      }
    }
    case SEARCH_FAILURE: {
      return {
        ...state,
        searching: false,
        searchError: action.error
      }
    }
    default:
      return state
  }
}

