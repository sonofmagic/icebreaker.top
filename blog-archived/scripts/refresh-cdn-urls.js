const tencentcloud = require('tencentcloud-sdk-nodejs')
const { wait } = require('./utils')
require('dotenv').config()
const { TENCENT_SECRET_KEY, TENCENT_SECRET_ID } = process.env

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
  Paths: ['https://www.icebreaker.top/', 'https://icebreaker.top/'],
  FlushType: 'flush',
}

// PurgePathCache

;(async () => {
  try {
    // 等待戈多
    await wait(2000)
    // Urls : 刷新Cdn，记得要刷新 sw.js service worker !!!
    // const data = await client.PurgeUrlsCache(params)
    const res1 = await client.PurgePathCache(params)
    console.log(res1)
    const res2 = await client.PurgeUrlsCache({
      Urls: params.Paths,
    })
    console.log(res2)
  } catch (err) {
    console.error('error', err)
  }
})()
