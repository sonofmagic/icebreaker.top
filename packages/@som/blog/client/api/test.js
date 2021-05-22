import request from './utils/request.js'
export function authTest() {
  return request.get('/', {
    params: {
      a: 1,
      b: '123',
    },
  })
}
