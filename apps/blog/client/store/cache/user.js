import { getUserInfo } from '@/api/user'

export const state = () => {
  const usersCacheMap = new Map()
  return {
    users: usersCacheMap,
  }
}

export const mutations = {}

export const actions = {
  async getInfo({ state }, uid = '') {
    if (state.users.has(uid)) {
      return state.users.get(uid)
    } else {
      const { data } = await getUserInfo(uid)

      if (data.avatarUrl) {
        const { fileList } = await this.$cloudbase.getTempFileURL({
          fileList: [
            {
              fileID: data.avatarUrl,
              maxAge: 1000 * 60 * 30,
            },
          ],
        })
        data.realAvatarUrl = fileList[0].tempFileURL
      }

      state.users.set(uid, data)
      return data
    }
  },
}
