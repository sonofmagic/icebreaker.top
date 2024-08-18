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
      <slot name="placeholder"></slot>
    </template>
    <template #error>
      <slot name="error"></slot>
    </template>
  </el-image>
</template>

<script>
import { isCloudbaseUrl } from '@/utils/validate'
import { mapActions } from 'vuex'

const watch = {}
if (process.client) {
  watch.src = {
    async handler(src) {
      let tSrc = src
      if (isCloudbaseUrl(tSrc)) {
        tSrc = await this.getSingleUrl(tSrc)
      }
      this.innerSrc = tSrc
    },
    immediate: true,
  }
}
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
  watch,
  methods: {
    ...mapActions('user', ['getSingleUrl']),
  },
}
</script>

<style></style>
