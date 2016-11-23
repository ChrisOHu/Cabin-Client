import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'


export const BECOME_HOST_REQUEST = 'BECOME_HOST_REQUEST'
export const BECOME_HOST_SUCCESS = 'BECOME_HOST_SUCCESS'
export const BECOME_HOST_FAILURE = 'BECOME_HOST_FAILURE'
export function becomeHost({userId, name, avatar, banner}) {
  return (dispatch) {
    dispatch(request(BECOME_HOST_REQUEST))

    feathers().service('hosts')
      .create({user: {userId, name, avatar, banner}})
      .then((result) => {
        const host = result
        dispatch(success(BECOME_HOST_SUCCESS, host))
      })
      .catch((err) => {
        dispatch(failure(BECOME_HOST_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}

export const FETCH_HOSTS_REQUEST     = 'FETCH_HOSTS_REQUEST'
export const FETCH_HOSTS_SUCCESS     = 'FETCH_HOSTS_SUCCESS'
export const FETCH_HOSTS_FAILURE     = 'FETCH_HOSTS_FAILURE'
export function fetchHosts() {
  return (dispatch) => {
    dispatch(request(FETCH_HOSTS_REQUEST))

    feathers().service('hosts')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const hosts = result
        dispatch(success(FETCH_HOSTS_SUCCESS, hosts))
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOSTS_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))
      })
  }
}

export const FETCH_HOST_REQUEST      = 'FETCH_HOST_REQUEST'
export const FETCH_HOST_SUCCESS      = 'FETCH_HOST_SUCCESS'
export const FETCH_HOST_FAILURE      = 'FETCH_HOST_FAILURE'
export function fetchHost(hostId) {
  return (dispatch) => {
    dispatch(request(FETCH_HOST_REQUEST))

    feathers().service('hosts')
      .get(hostId)
      .then((result) => {
        const host = result
        dispatch(success(FETCH_HOSTS_SUCCESS, host))
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOST_FAILURE, err))
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

