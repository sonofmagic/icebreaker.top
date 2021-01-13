/* 验证大陆手机号 */
export const MobilePattern = /^1\d{10}$/
/* 验证大陆手机号 */
export function validateMobile(value) {
  return MobilePattern.test(value)
}

// eslint-disable-next-line no-useless-escape
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[-\da-zA-Z`=\\\[\];',./~!@#$%^&*()_+|{}:"<>?]{8,32}$/
// eslint-disable-next-line no-useless-escape
export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmail(value) {
  return emailPattern.test(value)
}

export const cloudbaseUrlPattern = /^cloud:\/\//

export function isCloudbaseUrl(url) {
  return cloudbaseUrlPattern.test(url)
}
