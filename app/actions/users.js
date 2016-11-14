import t from 'counterpart'
import { getInstance } from '../feathers'

const feathers = getInstance()

export const REGISTER_REQUEST = "REGISTER_REQUEST"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"

export const LOGIN_REQUEST    = "LOGIN_REQUEST"
export const LOGIN_SUCCESS    = "LOGIN_SUCCESS"
export const LOGIN_FAILURE    = "LOGIN_FAILURE"

export const LOGOUT_REQUEST   = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS   = "LOGOUT_SUCCESS"
export const LOGOUT_FAILURE   = "LOGOUT_FAILURE"

export function register({phone, password}) {
  return (dispatch) => {
    dispatch(registerRequest())

    feathers.service('users')
      .create({phone, password})
      .then((result) => {
        console.log('register success =>')
        console.log(JSON.stringify(result))
        return feathers.authenticate({
          type: 'local',
          phone: phone,
          password: password
        })
      })
      .then((result) => {
        console.log('authenticate success =>')
        console.log(JSON.stringify(result))
        // app.get('token')
        dispatch(registerSuccess(result))
      })
      .catch((err) => {
        /**
         * The Feathers.Error Object JSONified
         *
         * {
         *   "name": "NotAuthenticated",
         *   "message": "Invalid login.",
         *   "code": 401,
         *   "className": "not-authenticated",
         *   "errors": {}
         * }
         *
         * see feathers docs' errors section
         */
        // TODO: handle error cases: network, user doesn't exist, password incorrect, .etc
        console.log('register error =>')
        console.log(JSON.stringify(err))
        dispatch(registerFailure(t("opsError")))
      })
  }
}
function registerRequest() { return { type: REGISTER_REQUEST } }
function registerSuccess(user)  { return { type: REGISTER_SUCCESS, user } }
function registerFailure(error) { return { type: REGISTER_FAILURE, error } }

export function login({phone, password}) {
  return (dispatch) => {
    dispatch(loginRequest())

    feathers.authenticate({
      type: 'local',
      phone: phone,
      password: password
    })
      .then((result) => {
        console.log('login success =>')
        console.log(JSON.stringify(result))
        // app.get('token')
        dispatch(loginSuccess(result))
      })
      .catch((err) => {
        console.log('login error =>')
        console.log(JSON.stringify(err))
        dispatch(loginFailure(t("checkPhonePwd")))
      })
  }
}
function loginRequest() { return { type: LOGIN_REQUEST } }
function loginSuccess(user) { return { type: LOGIN_SUCCESS, user } }
function loginFailure(error) { return { type: LOGIN_FAILURE, error } }

export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest())

    feathers.logout()
      .then((result) => {
        console.log('logout success =>')
        console.log(JSON.stringify(result))
        dispatch(logoutSuccess())
      })
      .catch((err) => {
        console.log('logout error =>')
        console.log(JSON.stringify(err))
        dispatch(logoutFailure(err))
      })
  }
}
function logoutRequest() { return { type: LOGOUT_REQUEST } }
function logoutSuccess() { return { type: LOGOUT_SUCCESS } }
function logoutFailure(error) { return { type: LOGOUT_FAILURE, error } }

