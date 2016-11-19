import t from 'counterpart'
import { getInstance } from '../feathers'
import { showToast } from './app'
import {
  naviToLaunch, naviToHome
} from './navigations'

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

export const PATCH_USER_PROFILE_REQUEST = "PATCH_USER_PROFILE_REQUEST"
export const PATCH_USER_PROFILE_SUCCESS = "PATCH_USER_PROFILE_SUCCESS"
export const PATCH_USER_PROFILE_FAILURE = "PATCH_USER_PROFILE_FAILURE"

export function register({phone, name, password}) {
  return (dispatch) => {
    dispatch(registerRequest())

    feathers.service('users')
      .create({phone, name, password})
      .then((result) => {
        return feathers.authenticate({
          type: 'local',
          phone: phone,
          password: password
        })
      })
      .then((result) => {
        // app.get('token')
        dispatch(registerSuccess(result))
        dispatch(showToast({message: 'TADA~~: Register success'}))
        dispatch(naviToHome())
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
        dispatch(registerFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
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
        // app.get('token')
        dispatch(loginSuccess(result))
        dispatch(showToast({message: "TADA~: login success"}))
        dispatch(naviToHome())
      })
      .catch((err) => {
        dispatch(loginFailure(t("checkPhonePwd")))
        dispatch(showToast({message: t("checkPhonePwd")}))
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
        dispatch(logoutSuccess())
        dispatch(naviToLaunch())
      })
      .catch((err) => {
        dispatch(logoutFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}
function logoutRequest() { return { type: LOGOUT_REQUEST } }
function logoutSuccess() { return { type: LOGOUT_SUCCESS } }
function logoutFailure(error) { return { type: LOGOUT_FAILURE, error } }

export function patchUserProfile(userId, profileData) {
  return (dispatch) => {
    dispatch(patchUserProfileRequest())

    feathers.service('users')
      .patch(userId, profileData)
      .then((result) => {
        console.debug('## patchUserProfileSuccess =>')
        console.debug(result)
        dispatch(patchUserProfileSuccess(result))
      })
      .catch((err) => {
        console.debug('## patchUserProfileFailure =>')
        console.debug(JSON.stringify(err))
        dispatch(patchUserProfileFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}
function patchUserProfileRequest()      { return { type: PATCH_USER_PROFILE_REQUEST } }
function patchUserProfileSuccess(user)      { return { type: PATCH_USER_PROFILE_SUCCESS, user } }
function patchUserProfileFailure(error) { return { type: PATCH_USER_PROFILE_FAILURE, error } } 

