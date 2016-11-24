import t from 'counterpart'
import { getInstance as feathers } from '../feathers'
import { showToast } from './app'

export const POST_DESIGN_REQUEST = 'POST_DESIGN_REQUEST'
export const POST_DESIGN_SUCCESS = 'POST_DESIGN_SUCCESS'
export const POST_DESIGN_FAILURE = 'POST_DESIGN_FAILURE'
export function postDesign({designer, title, banner, content}) {
  const requestData = {designer, title, banner, content}
  return (dispatch) => {
    dispatch(request(POST_DESIGN_REQUEST, requestData))

    feathers().service('designs')
      .create({designer, title, banner, content})
      .then((result) => {
        const design = result
        dispatch(success(POST_DESIGN_SUCCESS, design))
      })
      .catch((err) => {
        dispatch(failure(POST_DESIGN_FAILURE, err))
        dispatch(showToast({message: t("opsError")}))
      })
  }
}

export const FETCH_DESIGNS_REQUEST = 'FETCH_DESIGNS_REQUEST'
export const FETCH_DESIGNS_SUCCESS = 'FETCH_DESIGNS_SUCCESS'
export const FETCH_DESIGNS_FAILURE = 'FETCH_DESIGNS_FAILURE'
export function fetchdesigns() {
  return (dispatch) => {
    dispatch(request(FETCH_DESIGNS_REQUEST))

    feathers().service('designs')
      .find(/*Query: see feathers's query*/)
      .then((result) => {
        const designs = result.data
        dispatch(success(FETCH_DESIGNS_SUCCESS, designs))
      })
      .catch((err) => {
        dispatch(failure(FETCH_DESIGNS_FAILURE, err))
        dispatch(showToast({message: t('opsError')}))
      })
  }
}

export const FETCH_DESIGN_REQUEST      = 'FETCH_DESIGN_REQUEST'
export const FETCH_DESIGN_SUCCESS      = 'FETCH_DESIGN_SUCCESS'
export const FETCH_DESIGN_FAILURE      = 'FETCH_DESIGN_FAILURE'
export function fetchdesign(designId) {
  return (dispatch) => {
    dispatch(request(FETCH_DESIGN_REQUEST, designId))

    feathers().service('designs')
      .get(designId)
      .then((result) => {
        const design = result
        dispatch(success(FETCH_DESIGN_SUCCESS, design))
      })
      .catch((err) => {
        dispatch(failure(FETCH_DESIGN_FAILURE, err))
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

