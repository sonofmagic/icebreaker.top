<script>
import CommonSlot from '@/components/layout/CommonSlot'

export default {
  name: 'ArticleLayout',
  components: {
    CommonSlot,
  },
}
</script>

<template>
  <CommonSlot>
    <div>
      <div class="container mx-auto">
        <Nuxt />
      </div>
    </div>

  </CommonSlot>
</template>
