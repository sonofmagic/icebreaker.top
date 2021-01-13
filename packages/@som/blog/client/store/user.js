import { validateEmail } from '@/utils/validate'
import errorHandler from '@/cloudbase/errorHandler'
import { uuid } from '@/utils'
let mutation
if (process.client) {
  mutation = require('@/cloudbase/db/mutation/index.js')
}

export const state = () => ({
  // _instance: null,
  // LoginState: null,
  user: {
    uid: null,
    loginType: null,
    // openid: null,
    // unionId: null,
    // wxOpenId: null,
    // wxPublicId: null,
    // wxUnionId: null,
    // customUserId: null,
    // qqMiniOpenId: null,
    createTime: null,
    nickName: null,
    gender: null,
    avatarUrl: null,
    location: null,
    username: null,
    email: null,
    hasPassword: null,

    realAvatarUrl: null,
  },
  isLogined: false,
})
// 用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做。
export const mutations = {
  SET_INSTANCE(state, instance) {
    Object.keys(state.user).forEach((k) => {
      state.user[k] = instance[k]
    })
  },
  SET_ISLOGINED(state, flag) {
    state.isLogined = flag
  },
}

export const actions = {
  async getSingleUrl(_, url) {
    const { fileList } = await this.$cloudbase.getTempFileURL({
      fileList: [
        {
          fileID: url,
          maxAge: 1000 * 60 * 5,
        },
      ],
    })
    return fileList[0].tempFileURL
  },
  async getBatchUrl(_, urls) {
    const { fileList } = await this.$cloudbase.getTempFileURL({
      fileList: urls.map((x) => ({
        fileID: x,
        maxAge: 1000 * 60 * 5,
      })),
    })
    return fileList
  },
  async refresh({ dispatch }) {
    if (this.$auth.currentUser) {
      const UserInfo = await this.$auth.currentUser.refresh()
      const { country, province, city } = UserInfo
      UserInfo.location = {
        country,
        province,
        city,
      }
      await dispatch('set', UserInfo)
      return UserInfo
    }
  },
  async set({ commit, dispatch }, payload) {
    if (payload.avatarUrl) {
      payload.realAvatarUrl = await dispatch('getSingleUrl', payload.avatarUrl)
    }

    commit('SET_INSTANCE', payload)
  },
  setIsLogined({ commit }, payload) {
    commit('SET_ISLOGINED', payload)
  },
  async login({ dispatch }, payload) {
    const { username, password } = payload
    try {
      let res
      if (validateEmail(username)) {
        res = await this.$auth.signInWithEmailAndPassword(username, password)
        console.log('邮箱登录成功')
      } else {
        res = await this.$auth.signInWithUsernameAndPassword(username, password)
        console.log('用户名登录成功')
      }
      if (!this.$auth.currentUser.nickName) {
        await this.$auth.currentUser.update({
          nickName: uuid(),
        })
        return await dispatch('refresh')
      } else {
        const { user } = res
        dispatch('set', user)
        return res
      }
    } catch (err) {
      throw errorHandler(err)
    }
  },
  async resetPassword({ dispatch }, payload) {
    const { email } = payload
    try {
      let res
      if (validateEmail(email)) {
        res = await this.$auth.sendPasswordResetEmail(email)
        console.log('邮箱重置密码成功')
      }
      return res
    } catch (err) {
      throw errorHandler(err)
    }
  },
  async signOut() {
    await this.$auth.signOut()
  },
  async comment({ state }, { id, content }) {
    return await mutation.commitComment(id, content, state.user)
  },
}

export const getters = {
  user: (state) => state.user,
  isLogined(state) {
    return state.isLogined
  },
  isAnony(state) {
    if (state.user) {
      return state.user.loginType === 'ANONYMOUS'
    } else {
      return false
    }
  },
}
