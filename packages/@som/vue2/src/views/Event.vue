<template>
  <div>
    <IceCustomEvent @click="log($event, $event, $event, $event, arguments, 'test')"></IceCustomEvent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IceCustomEvent from '@/components/custom-event/index.vue'
export default defineComponent({
  components: {
    IceCustomEvent
  },
  methods: {
    log (...args: any) {
      console.log(args)
    }
  }
})
</script>

<style scoped>
</style>
