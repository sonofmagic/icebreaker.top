<script>
// 127.7ms 8fps
import After from '@/components/perf/child-component-splitting/After'

export default {
  components: {
    After,
  },
  data() {
    return {
      value: 0,
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <input
      v-model.number="value"
      class="border border-solid border-green-400"
    >
    <After v-for="i in 300" :key="i" :number="value" />
  </div>
</template>
