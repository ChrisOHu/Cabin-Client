import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'

export const POST_HOME_REQUEST = 'POST_HOME_REQUEST'
export const POST_HOME_SUCCESS = 'POST_HOME_SUCCESS'
export const POST_HOME_FAILURE = 'POST_HOME_FAILURE'
export function postHome({ userId, name, banner, geolocation, price, descriptions, rooms, pictures },
  onSuccess, onError) {

  const requestData = { userId, name, banner, geolocation, price, descriptions, rooms, pictures }
  return (dispatch) => {
    dispatch(request(POST_HOME_REQUEST, requestData))

    //TODO: upload pictures

    feathers().service('homes')
      .create(requestData)
      .then((result) => {
        const home = result
        dispatch(success(POST_HOME_SUCCESS, home))

        onSuccess && onSuccess(home)
      })
      .catch((err) => {
        dispatch(failure(POST_HOME_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError(err)
      })
  }
}

export const FETCH_HOMES_REQUEST = 'FETCH_HOMES_REQUEST'
export const FETCH_HOMES_SUCCESS = 'FETCH_HOMES_SUCCESS'
export const FETCH_HOMES_FAILURE = 'FETCH_HOMES_FAILURE'
export function fetchHomes({}, onSuccess, onError) {
  return (dispatch) => {
    dispatch(request(FETCH_HOMES_REQUEST))

    feathers().service('homes')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const homes = result.data
        dispatch(success(FETCH_HOMES_SUCCESS, homes))

        onSuccess && onSuccess(homes)
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOMES_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))

        onError && onError(err)
      })
  }
}

export const FETCH_HOME_REQUEST = 'FETCH_HOME_REQUEST'
export const FETCH_HOME_SUCCESS = 'FETCH_HOME_SUCCESS'
export const FETCH_HOME_FAILURE = 'FETCH_HOME_FAILURE'
export function fetchHome(homeId, onSuccess, onError) {
  return (dispatch) => {
    dispatch(request(FETCH_HOME_REQUEST, homeId))

    feathers().service('homes')
      .get(homeId)
      .then((result) => {
        const home = result
        dispatch(success(FETCH_HOME_SUCCESS, home))

        onSuccess && onSuccess(home)
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOME_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))

        onError && onError(err)
      })
  }
}

export const SEARCH_HOMES_REQUEST = 'SEARCH_HOMES_REQUEST'
export const SEARCH_HOMES_SUCCESS = 'SEARCH_HOMES_SUCCESS'
export const SEARCH_HOMES_FAILURE = 'SEARCH_HOMES_FAILURE'
export function searchHomes(geolocation) {
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

