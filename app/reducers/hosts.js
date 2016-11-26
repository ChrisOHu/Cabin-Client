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
  host: {}, // The 'host' object of current user
  hosts: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BECOME_HOST_REQUEST:
      return {...state}
    case BECOME_HOST_SUCCESS:
      return {...state, host: action.data}
    case BECOME_HOST_FAILURE:
      return {...state}
    case FETCH_HOSTS_REQUEST:
      return {...state}
    case FETCH_HOSTS_SUCCESS:
      return {...state, hosts: action.data}
    case FETCH_HOSTS_FAILURE:
      return {...state}
    case FETCH_HOST_REQUEST:
      return {...state}
    case FETCH_HOST_SUCCESS:
      return {...state}
    case FETCH_HOST_FAILURE:
      return {...state}
    default:
      return state
  }
}

