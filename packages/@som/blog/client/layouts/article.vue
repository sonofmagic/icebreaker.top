<template>
  <CommonSlot>
    <div style="background-color: #f4f5f5">
      <div class="container mx-auto">
        <Nuxt />
      </div>
    </div>
  </CommonSlot>
</template>

<script>
import CommonSlot from '@/components/layout/CommonSlot'

// #F4F5F5 from https://juejin.cn/
export default {
  name: 'ArticleLayout',
  components: {
    CommonSlot,
  },
}
</script>
