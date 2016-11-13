import {
  CONNECT_REQUEST,
  CONNECTED,
  DISCONNECTED
} from '../actions/app'

const initialState = {
  connecting: false,
  connected: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CONNECT_REQUEST:
      return Object.assign({}, state, {connecting: true})
    case CONNECTED:
      return Object.assign({}, state, {connected: true})
    case DISCONNECTED:
      return Object.assign({}, state, {connected: false})
    default:
      return state
  }
}

