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

export function register({phone, name, password}, onSuccess, onError) {
  const requestData = {phone, name, password}
  return (dispatch) => {
    dispatch(request(REGISTER_REQUEST, requestData))

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
        dispatch(success(REGISTER_SUCCESS, {data, token}))
        dispatch(showToast({message: 'TADA~~: Register success'}))
        dispatch(naviToHome())

        onSuccess && onSuccess(data)
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
        dispatch(failure(REGISTER_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError && onError(err)
      })
  }
}

export function login({phone, password}, onSuccess, onError) {
  const requestData = {phone, password}
  return (dispatch) => {
    dispatch(request(LOGIN_REQUEST, requestData))

    feathers().authenticate({
      type: 'local',
      phone: phone,
      password: password
    })
      .then((result) => {
        // app.get('token')
        const { token, data } = result
        dispatch(success(LOGIN_SUCCESS, {data, token}))
        dispatch(showToast({message: "TADA~: login success"}))
        dispatch(naviToHome())

        onSuccess && onSuccess(data)
      })
      .catch((err) => {
        dispatch(failure(LOGIN_FAILURE, err))
        dispatch(showToast({message: t("checkPhonePwd")}))

        onError && onError(err)
      })
  }
}

export function logout({}, onSuccess, onError) {
  return (dispatch) => {
    dispatch(request(LOGOUT_REQUEST))

    feathers().logout()
      .then((result) => {
        dispatch(success(LOGOUT_SUCCESS, result))
        dispatch(naviToLaunch())

        onSuccess && onSuccess()
      })
      .catch((err) => {
        dispatch(failure(LOGOUT_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError && onError(err)
      })
  }
}

export function patchUserProfile(userId, profileData, onSuccess, onError) {
  const requestData = {userId, profileData}
  return (dispatch) => {
    dispatch(request(PATCH_USER_PROFILE_REQUEST, requestData))

    feathers().service('users')
      .patch(userId, profileData)
      .then((result) => {
        const latestUser = result
        dispatch(success(PATCH_USER_PROFILE_SUCCESS, latestUser))
        dispatch(showToast({message: t("saveSuccess")}))

        onSuccess && onSuccess(latestUser)
      })
      .catch((err) => {
        dispatch(failure(PATCH_USER_PROFILE_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError && onError(err)
      })

  }
}

export function updateUserBanner(userId, image, onSuccess, onError) {
  const requestData = {userId, image}
  const { path, width, height, mime, size, data } = image

  return (dispatch) => {
    dispatch(request(UPDATE_USER_BANNER_REQUEST, requestData))

    /** TODO: uploadImage().then(patch user profile) */
    feathers().service('users')
      .patch(userId, {banner: path})
      .then((result) => {
        const latestUser = result
        dispatch(success(UPDATE_USER_BANNER_SUCCESS, latestUser))
        dispatch(showToast({message: t("saveSuccess")}))

        onSuccess && onSuccess(latestUser)
      })
      .catch((err) => {
        dispatch(failure(UPDATE_USER_BANNER_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError && onError(err)
      })
  }
}

export function updateUserAvatar(userId, image, onSuccess, onError) {
  const requestData = {userId, image}
  const { path, width, height, mime, size, data } = image

  return (dispatch) => {
    dispatch(request(UPDATE_USER_AVATAR_REQUEST, requestData))

    /** TODO: uploadImage().then(patch user profile) */
    feathers().service('users')
      .patch(userId, {avatar: path})
      .then((result) => {
        const latestUser = result
        dispatch(success(UPDATE_USER_AVATAR_SUCCESS, latestUser))
        dispatch(showToast({message: t("saveSuccess")}))

        onSuccess && onSuccess(latestUser)
      })
      .catch((err) => {
        dispatch(failure(UPDATE_USER_AVATAR_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError && onError(err)
      })
  }
}

/** ======= */
function request(type, data) {
  return {type, data}
}
function success(type, data) {
  return {type, data}
}
function failure(type, error) {
  return {type, error}
}

