<script>
import CommonSlot from '@/components/layout/CommonSlot'
export default {
  name: 'NoFooterLayout',
  components: {
    CommonSlot,
  },
}
</script>

<template>
  <CommonSlot no-footer>
    <div>
      <Nuxt />
    </div>
  </CommonSlot>
</template>
