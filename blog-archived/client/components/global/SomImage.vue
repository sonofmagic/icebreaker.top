<script>
import { mapActions } from 'vuex'

export default {
  name: 'SomImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    width: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      innerSrc: '',
    }
  },
  computed: {
    srcList({ preview, innerSrc }) {
      if (preview) {
        return [innerSrc]
      }
      return null
    },
    imageStyle({ width, height }) {
      const obj = {
        width,
        height,
      }
      return obj
    },
  },
  methods: {
    ...mapActions('user', ['getSingleUrl']),
  },
}
</script>

<template>
  <el-image
    :src="innerSrc"
    :lazy="lazy"
    :preview-src-list="srcList"
    v-bind="$attrs"
    :style="imageStyle"
    v-on="$listeners"
  >
    <template #placeholder>
      <slot name="placeholder" />
    </template>
    <template #error>
      <slot name="error" />
    </template>
  </el-image>
</template>
