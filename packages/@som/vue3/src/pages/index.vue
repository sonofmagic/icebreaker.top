<template>
  <div>
    <Test :idx="idx"></Test>
    <button @click="idx++">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Test from '@/components/Test.vue'
export default defineComponent({
  components: { Test },
  setup () {
    const idx = ref(0)
    return {
      idx
    }
  }
})
</script>

<style scoped>
</style>
