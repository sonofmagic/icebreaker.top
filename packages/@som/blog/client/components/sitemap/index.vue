<template>
  <div :class="hidden ? 'hidden' : ''">
    <nuxt-link v-for="item in hrefs" :key="item" :to="item">{{
      item
    }}</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SitemapList',
  // props: {
  //   items: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
  props: {
    hidden: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState(['hrefs']),
  },
}
</script>

<style></style>
