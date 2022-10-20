<template>
  <div class="border pt-20 pl-60">
    <!-- <TwoBall></TwoBall> -->
    <Sheet></Sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TwoBall from '@/components/TwoBalls/index.vue'
import Sheet from '@/components/Sheet/index.vue'
export default Vue.extend({
  components: { Sheet, TwoBall }
})
</script>

<style scoped>

</style>
