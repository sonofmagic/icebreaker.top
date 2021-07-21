import axios from 'axios'
import { isDev, isProd } from '@/utils/env'
export function createAxiosInstance(baseURL) {
  const request = axios.create({
    baseURL,
    timeout: 10000,
  })

  request.interceptors.request.use(
    (config) => {
      isDev && console.log((config.baseURL || '') + config.url)
      return config
    },
    (error) => {
      isDev && console.log(error)
      return Promise.reject(error)
    }
  )

  request.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400: {
            if (process.client) {
              console.log(error.response && error.response.data)
              // require('element-ui').Message({
              //   message: error.response && error.response.data,
              //   type: 'error',
              //   duration: 3 * 1000,
              //   customClass: 'server-error',
              // })
            }
          }
        }
      }
      return Promise.reject(error)
    }
  )
  return request
}

export default createAxiosInstance(
  isProd ? 'https://svg.icebreaker.top/' : 'http://localhost:9000/'
)
