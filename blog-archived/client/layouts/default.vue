<script>
import CommonSlot from '@/components/layout/CommonSlot'
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
