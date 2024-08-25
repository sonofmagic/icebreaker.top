<script>
import CommonSlot from '@/components/layout/CommonSlot'
// import Sitemap from '@/components/sitemap'
export default {
  name: 'NoFooterLayout',
  components: {
    CommonSlot,
    // Sitemap,
  },
}
</script>

<template>
  <CommonSlot no-footer>
    <div>
      <Nuxt />
    </div>
    <!-- <Sitemap /> -->
  </CommonSlot>
</template>
