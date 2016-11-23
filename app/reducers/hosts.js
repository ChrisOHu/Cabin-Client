import {
  BECOME_HOST_REQUEST,
  BECOME_HOST_SUCCESS,
  BECOME_HOST_FAILURE,
  FETCH_HOSTS_REQUEST,
  FETCH_HOSTS_SUCCESS,
  FETCH_HOSTS_FAILURE,
  FETCH_HOST_REQUEST,
  FETCH_HOST_SUCCESS,
  FETCH_HOST_FAILURE
} from '../actions/hosts'

const initialState = {
  isRegistering: false,
  isFetching: false,
  isUpdating: false,
  error: null,

  host: {}, // The 'host' object of current user
  hosts: [],
  tmp: null // whatever tmp data needed
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BECOME_HOST_REQUEST:
      return {...state, isRegistering: true}
    case BECOME_HOST_SUCCESS:
      return {...state, isRegistering: false, host: action.data}
    case BECOME_HOST_FAILURE:
      return {...state, isRegistering: false, error: action.error}
    case FETCH_HOSTS_REQUEST:
      return {...state, isFetching: true}
    case FETCH_HOSTS_SUCCESS:
      return {...state, isFetching: false, hosts: action.data}
    case FETCH_HOSTS_FAILURE:
      return {...state, isFetching: false, error: action.error}
    case FETCH_HOST_REQUEST:
      return {...state, isFetching: true, tmp: null}
    case FETCH_HOST_SUCCESS:
      return {...state, isFetching: false, tmp: action.data}
    case FETCH_HOST_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

