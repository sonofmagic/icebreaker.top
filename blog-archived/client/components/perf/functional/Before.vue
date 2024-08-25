<script>
export default {
  props: ['value'],
}
</script>

<template>
  <div class="cell">
    <div v-if="value" class="on" />
    <section v-else class="off" />
  </div>
</template>
