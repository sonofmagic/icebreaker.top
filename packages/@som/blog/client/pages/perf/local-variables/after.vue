<template>
  <div class="container mx-auto">
    <input
      v-model.number="value"
      class="border border-solid border-green-400"
    />
    <After v-for="i in 300" :key="i" :start="value" />
  </div>
</template>

<script>
// 135.9ms 7fps
import After from '@/components/perf/local-variables/After'
export default {
  components: {
    After,
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style></style>
