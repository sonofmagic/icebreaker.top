<template>
  <div class="som-frame-selection-inner-box">
    <slot :selected="selected"></slot>
  </div>
</template>

<script>
export default {
  name: 'FrameSelectionItem',
  componentName: 'SomFrameSelectionItem',
  props: {
    selected: {
      type: [Boolean],
      default: false
    }
  }
}
</script>
<style lang="css" scoped>
.som-frame-selection-inner-box {
  display: inline-block;
  user-select: none;
}
</style>
