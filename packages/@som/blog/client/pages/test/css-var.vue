<template>
  <div
    class="
      container
      mx-auto
      pt-10
      h-screen
      custom-bg
      flex
      items-center
      justify-center
    "
  >
    <!-- <div
      class="h-32 w-32 flex justify-center items-center test-button"
      @click="toggle"
    >
      测试
    </div> -->
    <div
      class="bg-white w-32 h-32 rounded-full flex items-center justify-center"
    >
      <div class="text-center">
        <div class="text-primary-var">Primary</div>
        <div
          class="text-sm mb-2"
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
        ></el-color-picker>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { ThemeVariablesManager } from '@/theme/index'
import variables from '@/assets/scss/export.scss'
// import variables from '@/uni.scss'
const bgVarKey = '--primary-bg-color'
const llBgVarKey = 'theme' + bgVarKey
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

<style lang="scss" scoped>
// .custom-bg {
//   background-color: $primary-bg-color;
// }
</style>
