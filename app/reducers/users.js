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
  PATCH_USER_PROFILE_FAILURE,

  UPDATE_USER_BANNER_REQUEST,
  UPDATE_USER_BANNER_SUCCESS,
  UPDATE_USER_BANNER_FAILURE,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE
} from '../actions/users'

const initialState = {
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  isUpdating: false,

  error: null,

  user: {}
}

export default function (state = initialState, action) {
  if (action.error) console.error(action.error)

  switch (action.type) {
    case REGISTER_REQUEST:
      return Object.assign({}, state, { isRegistering: true })
    case REGISTER_SUCCESS: {
      const {token, user} = action.data
      return Object.assign({}, state, { isRegistering: false, isLoggedIn: true, token, user})
    }
    case REGISTER_FAILURE:
      return Object.assign({}, state, { isRegistering: false, error: action.error })
    case LOGIN_REQUEST:
      return Object.assign({}, state, { isLoggingIn: true })
    case LOGIN_SUCCESS: {
      const {token, user} = action.data
      return Object.assign({}, state, { isLoggingIn: false, isLoggedIn: true, token, user })
    }
    case LOGIN_FAILURE:
      return Object.assign({}, state, { isLoggingIn: false, error: action.error })
    case LOGOUT_REQUEST:
      return Object.assign({}, state, { isLoggingOut: true})
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoggingOut: false, isLoggedIn: false, user: {}, token: null })
    case LOGOUT_FAILURE:
      return Object.assign({}, state, { isLoggingOut: false, error: action.error })
    case PATCH_USER_PROFILE_REQUEST:
      return Object.assign({}, state, { isUpdating: true })
    case PATCH_USER_PROFILE_SUCCESS: {
      const user = action.data
      return Object.assign({}, state, { isUpdating: false, user })
    }
    case PATCH_USER_PROFILE_FAILURE:
      return Object.assign({}, state, { isUpdating: false, error: action.error })
    case UPDATE_USER_BANNER_REQUEST:
      return Object.assign({}, state, { isUpdating: true })
    case UPDATE_USER_BANNER_SUCCESS: {
      const user = action.data
      return Object.assign({}, state, { isUpdating: false, user })
    }
    case UPDATE_USER_BANNER_FAILURE: {
      return Object.assign({}, state, { isUpdating: false, error: action.error })
    }
    case UPDATE_USER_AVATAR_REQUEST:
      return Object.assign({}, state, { isUpdating: true })
    case UPDATE_USER_AVATAR_SUCCESS: {
      const user = action.data
      return Object.assign({}, state, { isUpdating: false, user })
    }
    case UPDATE_USER_AVATAR_FAILURE: {
      return Object.assign({}, state, { isUpdating: false, error: action.error })
    }
    default:
      return state
  }
}

