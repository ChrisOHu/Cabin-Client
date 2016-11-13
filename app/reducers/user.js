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
      return Object.assign({}, state, { registerSuccess: true,  user: action.user })
    case REGISTER_FAILURE:
      return Object.assign({}, state, { registerFailure: true,  error: action.error })
    /* LOGIN ********/
    case LOGIN_REQUEST:
      return Object.assign({}, state, { isLoggingIn: true,      error: null })
    case LOGIN_SUCCESS:
      return Object.assgin({}, state, { loginSuccess: true,     user: action.user })
    case LOGIN_FAILURE:
      return Object.assgin({}, state, { loginFailure: true,     error: action.error })
    /* LOGOUT *******/
    case LOGOUT_REQUEST:
      return Object.assign({}, state, { isLoggingOut: true,     error: null })
    case LOGOUT_SUCCESS:
      return Object.assgin({}, state, { logoutSuccess: true,    user: null })
    case LOGOUT_FAILURE:
      return Object.assgin({}, state, { logoutFailure: true,    error: action.error })
    /* default ******/
    default:
      return state
  }
}

