require('dotenv').config()
const {
  TENCENT_SECRET_ID,
  TENCENT_SECRET_KEY,
  TENCENT_COS_REGION,
  TENCENT_COS_BUCKET
} = process.env
const { TencentCOSWebsiteDeployer } = require('@icebreakers/deploy')

function wait(ts = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ts)
  })
}

async function main() {
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
    targetDir: 'dist'
  })

  await wait(2000)

  const res = await deployer.purgeUrlsCache({
    Urls: params.Paths
  })
  console.log(res)
}

main()
