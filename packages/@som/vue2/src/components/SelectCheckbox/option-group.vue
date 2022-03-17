<template>
  <ul class="hcm-select-group__wrap" v-show="visible">
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <div class="hcm-select-group">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script>
import Emitter from 'element-ui/src/mixins/emitter'

export default {
  mixins: [Emitter],

  name: 'ElOptionGroup',

  componentName: 'ElOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visible: true
    }
  },

  watch: {
    disabled (val) {
      this.broadcast('ElOption', 'handleGroupDisabled', val)
    }
  },

  methods: {
    queryChange () {
      this.visible = this.$children && Array.isArray(this.$children) && this.$children.some((option) => option.visible === true)
    }
  },

  created () {
    this.$on('queryChange', this.queryChange)
  },

  mounted () {
    if (this.disabled) {
      this.broadcast('ElOption', 'handleGroupDisabled', this.disabled)
    }
  }
}
</script>

<style lang="scss" scoped>
.hcm-select-group {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-wrap: wrap;
  ::v-deep & > div {
    margin-right: 20px;
  }
}
.hcm-select-group__wrap {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 50vw;
  &:not(:last-of-type) {
    padding-bottom: 24px;
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 20px;
      right: 20px;
      bottom: 12px;
      height: 1px;
      background: #e4e7ed;
    }
  }
}
</style>
