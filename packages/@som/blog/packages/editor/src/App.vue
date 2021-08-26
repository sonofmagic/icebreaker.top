<template>
  <div class="w-screen h-screen">
    <Editor></Editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from '@/components/editor/index.vue'

export default defineComponent({
  name: 'App',
  components: { Editor },
})
</script>
