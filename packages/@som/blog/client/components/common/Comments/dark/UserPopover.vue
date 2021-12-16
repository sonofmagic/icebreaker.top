<template>
  <el-popover
    placement="right"
    trigger="hover"
  >
    <template v-if="isRealLogined">
      <div v-loading="loading">
        <div class="flex items-center space-x-2 mb-2">
          <el-avatar
            v-if="userInfo.realAvatarUrl"
            :src="userInfo.realAvatarUrl"
          ></el-avatar>
          <span>{{ userInfo.nickName }}</span>
          <div
            v-if="getColorIcon(userInfo.gender)"
            class="flex items-center justify-center rounded-full w-4 h-4"
            :style="{ backgroundColor: getColorIcon(userInfo.gender).bgColor }"
          >
            <FontAwesomeIcon
              class="text-white"
              :icon="getColorIcon(userInfo.gender).icon"
            />
          </div>
        </div>

        <div
          v-if="userInfo.country || userInfo.province || userInfo.city"
          class="mb-2"
        >
          <span class="inline-block w-4">
            <FontAwesomeIcon
              class="text-teal-400"
              :icon="['fas', 'map-marker-alt']"
            />
          </span>
          <span>{{ userInfo.country }}{{ userInfo.province
            }}{{ userInfo.city }}</span>
        </div>
        <div class="mb-2">
          <span class="inline-block w-4">
            <FontAwesomeIcon
              class="text-teal-400"
              :icon="['fas', 'envelope']"
            />
          </span>
          <span>
            {{ userInfo.email }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <span>
        <span>请先点击右上角</span>
        <span class="text-primary-500">登录/注册</span>
      </span>
    </template>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script>
// MALE: '男',
//   FEMALE: '女',
//   UNKNOWN: '未知',
import { mapGetters } from 'vuex'
export default {
  name: 'UserPopover',
  props: {
    value: {
      type: [String],
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      userInfo: {},
    }
  },
  computed: {
    ...mapGetters('user', ['isRealLogined']),
    getColorIcon() {
      return (gender) => {
        if (gender === 'MALE') {
          return {
            icon: ['fas', 'mars'],
            bgColor: '#60BCF0',
          }
        } else if (gender === 'FEMALE') {
          return {
            icon: ['fas', 'venus'],
            bgColor: '#FF76AB',
          }
        }
      }
    },
  },
  methods: {
    async loadInfo() {
      try {
        if (this.isRealLogined) {
          const uid = this.value
          this.loading = true
          // const userInfo = await this.$store.dispatch('cache/user/getInfo', uid)
          // this.userInfo = userInfo
        }
      } catch (err) {
        console.debug(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
