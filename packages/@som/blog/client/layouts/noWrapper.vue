<template>
  <CommonSlot>
    <Nuxt />
    <Sitemap />
  </CommonSlot>
</template>
<script>
import CommonSlot from '@/components/layout/CommonSlot'
import Sitemap from '@/components/sitemap'
export default {
  name: 'NoWrapper',
  components: {
    CommonSlot,
    Sitemap,
  },
}
</script>
