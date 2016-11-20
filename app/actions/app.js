
export const SHOW_TOAST = 'SHOW_TOAST'
export const CLEAR_TOAST = 'CLEAR_TOAST'

let clearToastTimerId
export function showToast({message, duration}) {
  return (dispatch) => {
    dispatch(_showToast({message, duration}))

    clearToastTimerId && clearTimeout(clearToastTimerId)

    clearToastTimerId = setTimeout(() => {
      dispatch(clearToast())
    }, 8000)
  }
}

function _showToast({message, duration}) {
  return {
    type: SHOW_TOAST,
    toast: { message, duration }
  }
}
function clearToast() {
  return {
    type: CLEAR_TOAST,
    toast: { message: '' }
  }
}

