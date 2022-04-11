<template>
  <div class="som-frame-selection-inner-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FrameSelectionItem',
  componentName: 'SomFrameSelectionItem',
  props: {}
}
</script>

<style lang="scss" scoped>
.som-frame-selection-inner-box {
  width: 40px;
  height: 40px;
  background: rgba(255, 192, 203, 0.3);
  display: inline-block;
  margin-left: 20px;
  margin-top: 20px;
  vertical-align: top;
  user-select: none;
  &.selected {
    background: rgba(255, 192, 203, 1);
  }
}
</style>
