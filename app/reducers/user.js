import {
  register,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  login,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  logout,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE  
} from '../actions/users'

const initialState = {
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  error: null,
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    /* REGISTER *****/
    case REGISTER_REQUEST:
      return Object.assign({}, state, { isRegistering: true,    error: null })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { isRegistering: false,  user: action.user })
    case REGISTER_FAILURE:
      return Object.assign({}, state, { isRegistering: false,  error: action.error })
    /* LOGIN ********/
    case LOGIN_REQUEST:
      return Object.assign({}, state, { isLoggingIn: true,      error: null })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggingIn: false,     user: action.user })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggingIn: false,     error: action.error })
    /* LOGOUT *******/
    case LOGOUT_REQUEST:
      return Object.assign({}, state, { isLoggingOut: true,     error: null })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoggingOut: false,    user: null })
    case LOGOUT_FAILURE:
      return Object.assign({}, state, { isLoggingOut: false,    error: action.error })
    /* default ******/
    default:
      return state
  }
}

