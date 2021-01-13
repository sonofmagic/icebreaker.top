import Cloudbase from '@cloudbase/js-sdk'

const cloudbase = Cloudbase.init({
  env: process.env.TENCENT_CLOUDBASE_ENVID,
})

export const auth = cloudbase.auth({
  persistence: 'local',
})
export const db = cloudbase.database()

export default cloudbase
