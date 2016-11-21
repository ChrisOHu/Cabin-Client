import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'
import {
  naviToLaunch, naviToHome
} from './navigations'

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
export const UPDATE_USER_BANNER_REQUEST = "UPDATE_USER_BANNER_REQUEST"
export const UPDATE_USER_BANNER_SUCCESS = "UPDATE_USER_BANNER_SUCCESS"
export const UPDATE_USER_BANNER_FAILURE = "UPDATE_USER_BANNER_FAILURE"
export const UPDATE_USER_AVATAR_REQUEST = "UPDATE_USER_AVATAR_REQUEST"
export const UPDATE_USER_AVATAR_SUCCESS = "UPDATE_USER_AVATAR_SUCCESS"
export const UPDATE_USER_AVATAR_FAILURE = "UPDATE_USER_AVATAR_FAILURE"

export function register({phone, name, password}) {
  return (dispatch) => {
    dispatch(registerRequest())

    feathers().service('users')
      .create({phone, name, password})
      .then((result) => {
        return feathers().authenticate({
          type: 'local',
          phone: phone,
          password: password
        })
      })
      .then((result) => {
        // app.get('token')
        const { token, data } = result
        dispatch(registerSuccess(data, token))
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
function registerSuccess(user, token)  { return { type: REGISTER_SUCCESS, user, token } }
function registerFailure(error) { return { type: REGISTER_FAILURE, error } }

export function login({phone, password}) {
  return (dispatch) => {
    dispatch(loginRequest())

    feathers().authenticate({
      type: 'local',
      phone: phone,
      password: password
    })
      .then((result) => {
        // app.get('token')
        const { token, data } = result
        dispatch(loginSuccess(data, token))
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
function loginSuccess(user, token) { return { type: LOGIN_SUCCESS, user, token } }
function loginFailure(error) { return { type: LOGIN_FAILURE, error } }

export function logout() {
  return (dispatch) => {
    dispatch(logoutRequest())

    feathers().logout()
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

    feathers().service('users')
      .patch(userId, profileData)
      .then((result) => {
        dispatch(patchUserProfileSuccess(result))
        dispatch(showToast({message: t("saveSuccess")}))
      })
      .catch((err) => {
        dispatch(patchUserProfileFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
      })

  }
}
function patchUserProfileRequest()      { return { type: PATCH_USER_PROFILE_REQUEST } }
function patchUserProfileSuccess(user)  { return { type: PATCH_USER_PROFILE_SUCCESS, user } }
function patchUserProfileFailure(error) { return { type: PATCH_USER_PROFILE_FAILURE, error } }

export function updateUserBanner(userId, image) {
  const { path, width, height, mime, size, data } = image

  return (dispatch) => {
    dispatch(updateUserBannerRequest())

    /** TODO: uploadImage().then(patch user profile) */
    feathers().service('users')
      .patch(userId, {banner: path})
      .then((result) => {
        /**
         * Result is the latest user object:
         *  {
         *    "_id": "#$%^&*",
         *    "phone": "!@#$%^&",
         *    "__v": 0,
         *    ...
         *  }
         */
        console.debug('## updateUserBannerSuccess =>')
        console.debug(JSON.stringify(result))
        dispatch(updateUserBannerSuccess(path))
      })
      .catch((err) => {
        console.debug('## updateUserBannerFailure =>')
        console.debug(JSON.stringify(err))
        dispatch(updateUserBannerFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}
function updateUserBannerRequest() { return { type: UPDATE_USER_BANNER_REQUEST } }
function updateUserBannerSuccess(url) { return { type: UPDATE_USER_BANNER_SUCCESS, url } }
function updateUserBannerFailure(error) { return { type: UPDATE_USER_BANNER_FAILURE, error } }

export function updateUserAvatar(userId, image) {
  const { path, width, height, mime, size, data } = image

  return (dispatch) => {
    dispatch(updateUserAvatarRequest())

    /** TODO: uploadImage().then(patch user profile) */
    feathers().service('users')
      .patch(userId, {avatar: path})
      .then((result) => {
        console.debug('## updateUserAvatarSuccess =>')
        console.debug(JSON.stringify(result))
        dispatch(updateUserAvatarSuccess(path))
      })
      .catch((err) => {
        console.debug('## updateUserAvatarFailure =>')
        console.debug(JSON.stringify(err))
        dispatch(updateUserAvatarFailure(t("opsError")))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}
function updateUserAvatarRequest(userId, image) { return { type: UPDATE_USER_AVATAR_REQUEST } }
function updateUserAvatarSuccess(url) { return { type: UPDATE_USER_AVATAR_SUCCESS, url } }
function updateUserAvatarFailure(error) { return { type: UPDATE_USER_AVATAR_FAILURE, error } }

