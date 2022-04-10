<template>
  <FrameSelection :AxisX="AxisX" :AxisY="AxisY" @selectCell="getData"> </FrameSelection>
</template>

<script>
// https://github.com/HuXiaoTu/frame-selection
import FrameSelection from './index.vue'
export default {
  components: {
    FrameSelection
  },
  data () {
    return {
      AxisX: [1, 2, 3],
      AxisY: [100, 200, 300]
    }
  },
  methods: {
    // 当选中格子时触发
    getData (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
