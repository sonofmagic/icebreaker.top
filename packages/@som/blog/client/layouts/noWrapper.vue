<template>
  <CommonSlot>
    <Nuxt />
  </CommonSlot>
</template>
<script>
import CommonSlot from '@/components/layout/CommonSlot'
export default {
  name: 'NoWrapper',
  components: {
    CommonSlot,
  },
}
</script>
