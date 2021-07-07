require('dotenv').config()
const { TENCENT_SECRET_KEY, TENCENT_SECRET_ID } = process.env
const tencentcloud = require('tencentcloud-sdk-nodejs')
const CdnClient = tencentcloud.cdn.v20180606.Client

const clientConfig = {
  credential: {
    secretId: TENCENT_SECRET_ID,
    secretKey: TENCENT_SECRET_KEY,
  },
  // region: '',
  profile: {
    httpProfile: {
      endpoint: 'cdn.tencentcloudapi.com',
    },
  },
}

const client = new CdnClient(clientConfig)
const params = {
  Urls: ['https://www.icebreaker.top/', 'https://icebreaker.top/'],
}
// PurgePathCache

;(async () => {
  try {
    const data = await client.PurgeUrlsCache(params)
    console.log(data)
  } catch (err) {
    console.error('error', err)
  }
})()
