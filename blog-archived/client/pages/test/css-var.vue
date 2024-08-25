<script>
import throttle from 'lodash/throttle'
import { ThemeVariablesManager } from '@/theme/index'
import variables from '@/assets/scss/export.scss'
// import variables from '@/uni.scss'
const bgVarKey = '--primary-bg-color'
const llBgVarKey = `theme${bgVarKey}`
export default {
  data() {
    return {
      count: 0,
      primaryBgColor: '#ffffff',
      variables,
    }
  },
  created() {
    if (process.client) {
      this.primaryBgColor = localStorage.getItem(llBgVarKey) || '#ffffff'
      this.themeManager = new ThemeVariablesManager()
      this.setBg(this.primaryBgColor)
    }
  },
  methods: {
    setBg: throttle(function (color) {
      // console.log(this)
      this.themeManager.setRootSingleVariable(bgVarKey, color)
    }, 100),
    // 按确定之后触发
    change(val) {
      // console.log(`[change]:${val}`)
      this.setBg(val)
      localStorage.setItem(llBgVarKey, val)
    },
    // 一动就出发
    activeChange(val) {
      // console.log(`[activeChange]:${val}`)
      this.setBg(val)
    },
  },
}
</script>

<template>
  <div
    class="custom-bg container mx-auto flex h-screen items-center justify-center pt-10"
  >
    <!-- <div
      class="h-32 w-32 flex justify-center items-center test-button"
      @click="toggle"
    >
      测试
    </div> -->
    <div
      class="flex h-32 w-32 items-center justify-center rounded-full bg-white"
    >
      <div class="text-center">
        <div class="text-primary-var">
          Primary
        </div>
        <div
          class="mb-2 text-sm"
          :style="{
            color: primaryBgColor,
          }"
        >
          {{ primaryBgColor }}
        </div>

        <el-color-picker
          v-model="primaryBgColor"
          @change="change"
          @active-change="activeChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .custom-bg {
//   background-color: $primary-bg-color;
// }
</style>
