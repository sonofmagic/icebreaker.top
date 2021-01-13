import request from './utils/request.js'

export function getUserInfo(uid = '') {
  return request.get(`/api/user/info/${uid}`)
}
