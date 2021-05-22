import crypto from 'crypto-browserify'
// import { encode } from 'js-base64'
import { stringify } from 'query-string'
// const { API_GW_APIAPPKEY, API_GW_APIAPPSECRET } = process.env
const API_GW_APIAPPKEY = process.env.API_GW_APIAPPKEY
const API_GW_APIAPPSECRET = process.env.API_GW_APIAPPSECRET
/**
 * @typedef {import('axios').AxiosRequestConfig} config
 * @param {config} config
 */
export function sign(config) {
  // console.log(Buffer)
  const dateTime = new Date().toUTCString()
  const body = config.data || {}
  const bodyStr = JSON.stringify(body)
  const md5 = crypto.createHash('md5').update(bodyStr, 'utf8').digest('hex')
  const contentMD5 = Buffer.from(md5).toString('base64')
  config.headers['Content-MD5'] = contentMD5
  // config.headers['Content-Length'] = bodyStr.length
  config.headers['x-date'] = dateTime
  config.headers['Content-Type'] = 'application/json'
  config.headers.Accept = 'application/json'

  const targetPath = config.url + '?' + stringify(config.params)
  const signingStr = [
    `x-date: ${dateTime}`,
    config.method.toUpperCase(),
    config.headers.Accept,
    config.headers['Content-Type'],
    contentMD5,
    targetPath,
  ].join('\n')
  // console.log(config)

  const signing = crypto
    .createHmac('sha1', API_GW_APIAPPSECRET)
    .update(signingStr, 'utf8')
    .digest('base64')
  const sign = `hmac id="${API_GW_APIAPPKEY}", algorithm="hmac-sha1", headers="x-date", signature="${signing}"`
  config.headers.Authorization = sign
  return config
}
