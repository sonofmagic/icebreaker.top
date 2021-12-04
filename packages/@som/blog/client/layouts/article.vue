<template>
  <CommonSlot>
    <div style="background-color: #f4f5f5">
      <div class="container mx-auto">
        <Nuxt />
      </div>
    </div>
    <Sitemap />
  </CommonSlot>
</template>

<script>
import CommonSlot from '@/components/layout/CommonSlot'
import Sitemap from '@/components/sitemap'
// #F4F5F5 from https://juejin.cn/
export default {
  name: 'ArticleLayout',
  components: {
    CommonSlot,
    Sitemap,
  },
}
</script>
