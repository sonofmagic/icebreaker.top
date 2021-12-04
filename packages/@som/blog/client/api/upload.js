import svgReq from './utils/svgReq'

export function upload2Gray(file, option) {
  const data = new FormData()
  data.append('file', file)

  const config = { responseType: 'blob' }
  if (option.onProgress) {
    config.onUploadProgress = (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      option.onProgress(percentCompleted)
      // console.log(percentCompleted)
    }
  }
  return svgReq.post('/api/v1/img/gray', data, config)
}

export function upload2Ascii(file, option) {
  const data = new FormData()
  data.append('file', file)
  return svgReq.post('/api/v1/img/ascii', data)
}

export function upload2Ascii2(file, option = {}) {
  const data = new FormData()
  data.append('file', file)
  Object.entries(option).forEach(([k, v]) => {
    data.append(k, v)
  })
  return svgReq.post('/api/v1/img/ascii2', data)
}

export function upload2Bit(file) {
  const data = new FormData()
  data.append('file', file)
  return svgReq.post('/api/v1/img/bit', data)
}
