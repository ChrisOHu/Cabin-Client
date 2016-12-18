import _ from 'underscore'

export function uploadFile({url, file, fieldName = 'file', fields}) {
  return formPost({
    url,
    data: {
      [fieldName]: file,
      ...fields
    }
  })
}
export function uploadFiles({url, files, fieldName = 'files', fields}) {
  return formPost({
    url,
    data: {
      [fieldName]: files,
      ...fields
    }
  })
}

export function formPost({ url, method = 'POST', data, onProgress }) {
  return new Promise(function(resolve, reject) {

    let body = new FormData()
    _.each(data, (value, key) => {
      body.append(key, value)
    })

    let xhr = new XMLHttpRequest()
    xhr.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total
        console.debug('[multipart/form-data] => ', percentComplete)
        onProgress && onProgress(percentComplete)
      }
    })
    xhr.addEventListener("load",  (event) => {
      console.debug('[multipart/form-data] success => ', event)
      resolve(JSON.parse(xhr.responseText))
    })
    xhr.addEventListener("[multipart/form-data] error", (event) => {
      console.error('upload error => ', event)
      reject(event)
    })
    xhr.addEventListener("[multipart/form-data] abort", (event) => {
      console.error('upload abort =>', event)
      reject(event)
    })

    xhr.open(method, url)
    xhr.send(body)
  })
}

