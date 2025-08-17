<script>
import { mapState } from 'vuex'

export default {
  name: 'SitemapList',
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

<template>
  <div :class="hidden ? 'hidden' : ''">
    <slot :data="hrefs">
      <div class="flex flex-col">
        <nuxt-link v-for="item in hrefs" :key="item.id" :to="item.path">
          {{
            item.title
          }}
        </nuxt-link>
      </div>
    </slot>
  </div>
</template>
