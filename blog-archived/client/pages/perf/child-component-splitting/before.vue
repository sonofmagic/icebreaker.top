<template>
  <div class="container mx-auto">
    <input
      v-model.number="value"
      class="border border-solid border-green-400"
    />
    <Before v-for="i in 300" :key="i" :number="value" />
  </div>
</template>

<script>
// 149.1ms 7fps
import Before from '@/components/perf/child-component-splitting/Before'
export default {
  components: {
    Before,
  },
  data() {
    return {
      value: 0,
    }
  },
}
</script>

