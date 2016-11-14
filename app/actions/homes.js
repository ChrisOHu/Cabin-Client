
export const SEARCH_REQUEST = 'homes.SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'homes.SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'homes.SEARCH_FAILURE'

export function search({ latlng, sortBy }) {
  return (dispatch) => {
    dispatch(searchRequest())

  }
}

function searchRequest() {
  return { type: SEARCH_REQUEST }
}
function searchSuccess() {
}
function searchFailure() {
}

