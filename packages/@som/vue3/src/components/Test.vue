<template>
  <div>{{ props }}</div>
  <div>{{ JSON.stringify(props) }}</div>
  <div>changeTime:{{ changeTime }}</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, ref } from 'vue'

export default defineComponent({
  props: {
    idx: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const changeTime = ref(0)
    watch(
      () => {
        return props.idx
      },
      () => {
        changeTime.value++
      }
    )
    return {
      props: toRefs(props),
      changeTime
    }
  }
})
</script>

<style scoped>
</style>
