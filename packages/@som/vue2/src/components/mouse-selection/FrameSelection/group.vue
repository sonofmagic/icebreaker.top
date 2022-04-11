<template>
  <div ref="wrap" class="som-frame-selection-group-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import MouseSelection from '../lib/index'
export default {
  name: 'FrameSelectionGroup',
  componentName: 'SomFrameSelectionGroup',
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
    },
    getInnerBoxRectList () {
      return Array.from(this.$refs.wrap.querySelectorAll('.som-frame-selection-inner-box')).map((node) => {
        return {
          left: node.offsetLeft,
          top: node.offsetTop,
          width: node.offsetWidth,
          height: node.offsetHeight
        }
      })
    }
  },
  mounted () {
    this.selection = new MouseSelection(this.$refs.wrap, {
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
