import request from './utils/request.js'

export function getUserInfo(uid = '') {
  return request.get(`/api/v1/user/info/${uid}`)
}
