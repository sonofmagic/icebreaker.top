// 建议分为2个文件
// example
// 例如 fn作为基础，产生请求不同url的axios实例，可把baseURL换成axios options来获取更大的自由度
// 建议server和client的分开写
// 不然会出现 esm 里混杂 cjs 的丑陋写法
// 例如下面的response 400
import axios from 'axios'
import { isProd } from '@/utils/env'
export function createAxiosInstance(baseURL) {
  const request = axios.create({
    baseURL,
    timeout: 10000,
  })

  request.interceptors.request.use(
    (config) => {
      process.env.NODE_ENV === 'development' &&
        console.log((config.baseURL || '') + config.url)
      return config
    },
    (error) => {
      process.env.NODE_ENV === 'development' && console.log(error)
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
              require('element-ui').Message({
                message: error.response && error.response.data,
                type: 'error',
                duration: 3 * 1000,
                customClass: 'server-error',
              })
            }
          }
        }
      }
      return Promise.reject(error)
    }
  )
  return request
}

const url = isProd ? process.env.BASE_URL : process.env.BASE_URL // 'http://127.0.0.1:9000'
export default createAxiosInstance(url)
