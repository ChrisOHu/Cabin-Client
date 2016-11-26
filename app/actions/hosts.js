import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'

export const BECOME_HOST_REQUEST = 'BECOME_HOST_REQUEST'
export const BECOME_HOST_SUCCESS = 'BECOME_HOST_SUCCESS'
export const BECOME_HOST_FAILURE = 'BECOME_HOST_FAILURE'
export function becomeHost({userId}, onSuccess, onError) {
  const requestData = {userId, name, avatar, banner}
  return (dispatch) => {
    dispatch(request(BECOME_HOST_REQUEST, requestData))

    feathers().service('hosts')
      .create({userId})
      .then((result) => {
        const host = result
        dispatch(success(BECOME_HOST_SUCCESS, host))

        onSuccess && onSuccess(host)
      })
      .catch((err) => {
        dispatch(failure(BECOME_HOST_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))

        onError(err)
      })
  }
}

export const FETCH_HOSTS_REQUEST     = 'FETCH_HOSTS_REQUEST'
export const FETCH_HOSTS_SUCCESS     = 'FETCH_HOSTS_SUCCESS'
export const FETCH_HOSTS_FAILURE     = 'FETCH_HOSTS_FAILURE'
export function fetchHosts({}, onSuccess, onError) {
  return (dispatch) => {
    dispatch(request(FETCH_HOSTS_REQUEST))

    feathers().service('hosts')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const hosts = result.data
        dispatch(success(FETCH_HOSTS_SUCCESS, hosts))

        onSuccess && onSuccess(hosts)
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOSTS_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))

        onError && onError(err)
      })
  }
}

export const FETCH_HOST_REQUEST      = 'FETCH_HOST_REQUEST'
export const FETCH_HOST_SUCCESS      = 'FETCH_HOST_SUCCESS'
export const FETCH_HOST_FAILURE      = 'FETCH_HOST_FAILURE'
export function fetchHost(hostId, onSuccess, onError) {
  const requestData = hostId
  return (dispatch) => {
    dispatch(request(FETCH_HOST_REQUEST, requestData))

    feathers().service('hosts')
      .get(hostId)
      .then((result) => {
        const host = result
        dispatch(success(FETCH_HOST_SUCCESS, host))

        onSuccess(host)
      })
      .catch((err) => {
        dispatch(failure(FETCH_HOST_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))

        onError(err)
      })
  }
}

function request(type, data) {
  return {type, data}
}
function success(type, data) {
  return {type, data}
}
function failure(type, error) {
  return {type, error}
}

