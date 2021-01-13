<template>
  <section class="container mx-auto">
    <div class="pt-4">
      <baidu-map class="map" center="苏州"> </baidu-map>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line no-unused-vars
/* global BMapGL */
export default {
  name: 'BaiduMapSection',
  data() {
    return {}
  },
  head() {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
