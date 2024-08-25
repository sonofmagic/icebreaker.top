/* 验证大陆手机号 */
export const MobilePattern = /^1\d{10}$/
/* 验证大陆手机号 */
export function validateMobile(value) {
  return MobilePattern.test(value)
}

export const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[-\w`=\\[\];',./~!@#$%^&*()+|{}:"<>?]{8,32}$/i

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i

export function validateEmail(value) {
  return emailPattern.test(value)
}

export const cloudbaseUrlPattern = /^cloud:\/\//

export function isCloudbaseUrl(url) {
  return cloudbaseUrlPattern.test(url)
}
