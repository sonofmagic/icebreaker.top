<template>
  <div class="relative left-[64px] top-[64px]">
    <!-- <TwoBall></TwoBall> -->
    <Sheet></Sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import TwoBall from '@/components/TwoBalls/index.vue'
import Sheet from '@/components/Sheet/index.vue'
export default Vue.extend({
  components: { Sheet }
})
</script>

<style scoped>

</style>
