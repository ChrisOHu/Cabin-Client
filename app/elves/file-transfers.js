
/**
 * file: {uri, type, name}
 */
export function upload({ url, files, onProgress }) {
  return new Promise(function(resolve, reject) {

    if (!files || files.length <= 0) {
      return
    }

    let body = new FormData()
    body.append('files', files)
    let xhr = new XMLHttpRequest()
    xhr.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total
        console.debug('upload progress => ', percentComplete)
        onProgress && onProgress(percentComplete)
      }
    })
    xhr.addEventListener("load",  (event) => {
      console.debug('upload success => ', event)
      resolve(JSON.parse(xhr.responseText))
    })
    xhr.addEventListener("error", (event) => {
      console.error('upload error => ', event)
      reject(event)
    })
    xhr.addEventListener("abort", (event) => {
      console.error('upload abort =>', event)
      reject(event)
    })

    xhr.open('POST', url)
    xhr.send(body)
  })
}

