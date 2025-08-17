<script>
import CommonSlot from '@/components/layout/CommonSlot'
// import Sitemap from '@/components/sitemap'
export default {
  name: 'PublicLayout',
  components: {
    CommonSlot,
  },
  methods: {

  },
}
</script>

<template>
  <CommonSlot>
    <div>
      <Nuxt />
    </div>
  </CommonSlot>
</template>
