require('dotenv').config()
const {
  TENCENT_SECRET_ID,
  TENCENT_SECRET_KEY,
  TENCENT_COS_REGION,
  TENCENT_COS_BUCKET
} = process.env
const { TencentCOSWebsiteDeployer } = require('@icebreakers/deploy')
const tencentcloud = require('tencentcloud-sdk-nodejs')

function wait (ts = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ts)
  })
}
const CdnClient = tencentcloud.cdn.v20180606.Client

async function main () {
  const clientConfig = {
    credential: {
      secretId: TENCENT_SECRET_ID,
      secretKey: TENCENT_SECRET_KEY
    },
    // region: '',
    profile: {
      httpProfile: {
        endpoint: 'cdn.tencentcloudapi.com'
      }
    }
  }

  const client = new CdnClient(clientConfig)

  const params = {
    Paths: ['https://cloudbase.icebreaker.top/'],
    FlushType: 'flush'
  }

  const deployer = new TencentCOSWebsiteDeployer({
    SecretKey: TENCENT_SECRET_KEY,
    SecretId: TENCENT_SECRET_ID
  })

  await deployer.uploadDir({
    Bucket: TENCENT_COS_BUCKET,
    Region: TENCENT_COS_REGION,
    clean: true,
    targetDir: '.output/public'
  })

  await wait(2000)

  const res = await client.PurgeUrlsCache({
    Urls: params.Paths
  })
  console.log(res)
}

main()
