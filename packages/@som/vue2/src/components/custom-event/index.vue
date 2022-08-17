<template>
  <div>
    <button @click="onClickEmit">click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, { emit }) {
    const onClickEmit = () => {
      emit('click', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0)
    }
    return {
      onClickEmit
    }
  }
})
</script>

<style scoped>
</style>
