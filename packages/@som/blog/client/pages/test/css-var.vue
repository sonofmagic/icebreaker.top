<template>
  <div class="container mx-auto pt-10 h-screen">
    <div
      class="h-32 w-32 flex justify-center items-center test-button"
      @click="toggle"
    >
      测试
    </div>
  </div>
</template>

<script>
import { ThemeVariablesManager } from '@/theme/index'
export default {
  data() {
    return {
      count: 0,
    }
  },
  mounted() {
    this.themeManager = new ThemeVariablesManager()
  },
  methods: {
    toggle() {
      // const primaryColor =
      //   document.documentElement.style.getPropertyValue('--primary-color')
      // console.log(primaryColor)
      this.count++
      if (this.count % 2) {
        this.themeManager.setRootSingleVariable('--primary-color', 'green')
        // document.documentElement.style.setProperty('--primary-color', 'green')
      } else {
        this.themeManager.setRootSingleVariable('--primary-color', 'red')
        // document.documentElement.style.setProperty('--primary-color', 'red')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
