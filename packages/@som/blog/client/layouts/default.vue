<template>
  <CommonSlot>
    <div>
      <Nuxt />
    </div>
  </CommonSlot>
</template>
<script>
import CommonSlot from '@/components/layout/CommonSlot'
export default {
  name: 'PublicLayout',
  components: {
    CommonSlot,
  },
}
</script>
