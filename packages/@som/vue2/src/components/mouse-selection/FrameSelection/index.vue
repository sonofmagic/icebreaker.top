<template>
  <div ref="wrap" class="som-frame-selection-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import MouseSelection from '../lib/index'
export default {
  name: 'FrameSelection',
  componentName: 'SomFrameSelection',
  provide () {
    return {
      SomFrameSelection: this
    }
  },
  props: {
    className: {
      type: [String]
    },
    scale: {
      type: [Number]
    },
    zIndex: {
      type: [Number]
    },
    disabled: {
      type: [Boolean]
    },
    stopPropagation: {
      type: [Boolean]
    },
    stopSelector: {
      type: [String]
    },
    notSetWrapPosition: {
      type: [Boolean]
    }
  },
  data () {
    return {
      selection: null
    }
  },
  methods: {
    isInTheSelection (rect) {
      if (this.selection) {
        return this.selection.isInTheSelection(rect)
      }
    }
  },
  mounted () {
    this.selection = new MouseSelection(this.$refs.wrapper, {
      onMousedown: (e) => {
        this.$emit('mousedown', e)
      },
      onMousemove: (e) => {
        this.$emit('mousemove', e)
      },
      onMouseup: (e) => {
        this.$emit('mouseup', e)
      },
      className: this.className,
      disabled: () => {
        return this.disabled
      },
      stopSelector: this.stopSelector,
      stopPropagation: this.stopPropagation,
      notSetWrapPosition: this.notSetWrapPosition,
      scale: this.scale,
      zIndex: this.zIndex
    })
  }
}
</script>

<style lang="scss" scoped>
.som-frame-selection-wrapper {
  background: rgba(255, 192, 203, 0.3);
}
</style>
