import CloudBase from '@cloudbase/manager-node'

const {
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID,
} = process.env

const app = CloudBase.init({
  secretId: TENCENT_SECRET_ID,
  secretKey: TENCENT_SECRET_KEY,
  envId: TENCENT_CLOUDBASE_ENVID,
})

export default app
