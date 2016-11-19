import {
  SHOW_TOAST,
  CLEAR_TOAST
} from '../actions/app'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  toast: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return Object.assign({}, state, { toast: action.toast })
    case CLEAR_TOAST:
      return Object.assign({}, state, { toast: action.toast })
    default:
      return state
  }
}

