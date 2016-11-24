import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'

export const POST_HOME_REQUEST = 'POST_HOME_REQUEST'
export const POST_HOME_SUCCESS = 'POST_HOME_SUCCESS'
export const POST_HOME_FAILURE = 'POST_HOME_FAILURE'
export function postHome({userId, name, banner}) {
  const requestData = {userId, name, banner}
  return (dispatch) => {
    dispatch(request(POST_HOME_REQUEST, requestData))

    feathers().service('homes')
      .create({userId, name, banner})
      .then((result) => {
        const home = result.data
        dispatch(success(POST_HOME_SUCCESS, home))
      })
      .catch((err) => {
        dispatch(failure(POST_HOME_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}

export const FETCH_HOMES_REQUEST = 'FETCH_HOMES_REQUEST'
export const FETCH_HOMES_SUCCESS = 'FETCH_HOMES_SUCCESS'
export const FETCH_HOMES_FAILURE = 'FETCH_HOMES_FAILURE'
export function fetchHomes() {
  return (dispatch) => {
    dispatch(request(FETCH_HOMES_REQUEST))

    feathers().service('homes')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const homes = result.data
        dispatch(success(FETCH_HOMES_SUCCESS, homes))
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOMES_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))
      })
  }
}

export const FETCH_HOME_REQUEST = 'FETCH_HOME_REQUEST'
export const FETCH_HOME_SUCCESS = 'FETCH_HOME_SUCCESS'
export const FETCH_HOME_FAILURE = 'FETCH_HOME_FAILURE'
export function fetchHome(homeId) {
  return (dispatch) => {
    dispatch(request(FETCH_HOME_REQUEST, homeId))

    feathers().service('homes')
      .get(homeId)
      .then((result) => {
        const home = result.data
        dispatch(success(FETCH_HOME_SUCCESS, home))
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOME_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))
      })
  }
}

function request(type) {
  return {type}
}
function success(type, data) {
  return {type, data}
}
function failure(type, error) {
  return {type, error}
}

