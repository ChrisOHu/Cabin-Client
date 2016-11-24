import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'

export const BECOME_DESIGNER_REQUEST = 'BECOME_DESIGNER_REQUEST'
export const BECOME_DESIGNER_SUCCESS = 'BECOME_DESIGNER_SUCCESS'
export const BECOME_DESIGNER_FAILURE = 'BECOME_DESIGNER_FAILURE'
export function becomeDesigner({userId, name, avatar, banner}) {
  const requestData = {userId, name, avatar, banner}
  return (dispatch) => {
    dispatch(request(BECOME_DESIGNER_REQUEST, requestData))

    feathers().service('designers')
      .create({userId})
      .then((result) => {
        const designer = result.data
        dispatch(success(BECOME_DESIGNER_SUCCESS, designer))
      })
      .catch((err) => {
        dispatch(failure(BECOME_DESIGNER_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}

export const FETCH_DESIGNERS_REQUEST     = 'FETCH_DESIGNERS_REQUEST'
export const FETCH_DESIGNERS_SUCCESS     = 'FETCH_DESIGNERS_SUCCESS'
export const FETCH_DESIGNERS_FAILURE     = 'FETCH_DESIGNERS_FAILURE'
export function fetchDesigners() {
  return (dispatch) => {
    dispatch(request(FETCH_DESIGNERS_REQUEST))

    feathers().service('designers')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const designers = result.data
        dispatch(success(FETCH_DESIGNERS_SUCCESS, designers))
      })
      .catch((err) => {
        dispatch(failure(FETCH_DESIGNERS_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))
      })
  }
}

export const FETCH_DESIGNER_REQUEST      = 'FETCH_DESIGNER_REQUEST'
export const FETCH_DESIGNER_SUCCESS      = 'FETCH_DESIGNER_SUCCESS'
export const FETCH_DESIGNER_FAILURE      = 'FETCH_DESIGNER_FAILURE'
export function fetchDesigner(designerId) {
  return (dispatch) => {
    dispatch(request(FETCH_DESIGNER_REQUEST, designerId))

    feathers().service('designers')
      .get(designerId)
      .then((result) => {
        const designer = result.data
        dispatch(success(FETCH_DESIGNER_SUCCESS, designer))
      })
      .catch((err) => {
        dispatch(failure(FETCH_DESIGNER_FAILURE, err))
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

