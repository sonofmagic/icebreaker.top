<template>
  <el-image :src="innerSrc" :lazy="lazy" v-bind="$attrs" v-on="$listeners">
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
  },
  data() {
    return {
      innerSrc: '',
    }
  },
  watch,
  methods: {
    ...mapActions('user', ['getSingleUrl']),
  },
}
</script>

<style></style>
