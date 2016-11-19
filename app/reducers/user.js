import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  PATCH_USER_PROFILE_REQUEST,
  PATCH_USER_PROFILE_SUCCESS,
  PATCH_USER_PROFILE_FAILURE
} from '../actions/users'

const initialState = {
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  error: null,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    /* REGISTER *****/
    case REGISTER_REQUEST:
      return Object.assign({}, state, { isRegistering: true,  error: null })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { isRegistering: false, isLoggedIn: true, user: action.user })
    case REGISTER_FAILURE:
      return Object.assign({}, state, { isRegistering: false, error: action.error })
    /* LOGIN ********/
    case LOGIN_REQUEST:
      return Object.assign({}, state, { isLoggingIn: true,    error: null })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggingIn: false,   isLoggedIn: true, user: action.user })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggingIn: false,   error: action.error })
    /* LOGOUT *******/
    case LOGOUT_REQUEST:
      return Object.assign({}, state, { isLoggingOut: true,   error: null })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoggingOut: false,  isLoggedIn: false, user: {} })
    case LOGOUT_FAILURE:
      return Object.assign({}, state, { isLoggingOut: false,  error: action.error })
    /* PATCH_USER_PROFILE **/
    case PATCH_USER_PROFILE_REQUEST:
      return Object.assign({}, state, { isPatchingProfile: true })
    case PATCH_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, { isPatchingProfile: false, user: action.user, error: null })
    case PATCH_USER_PROFILE_FAILURE:
      return Object.assign({}, state, { isPatchingProfile: false, error: action.error })
    /* default ******/
    default:
      return state
  }
}

