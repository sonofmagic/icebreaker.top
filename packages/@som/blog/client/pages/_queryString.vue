<template>
  <div>{{ queryString }}</div>
</template>

<script>
export default {
  asyncData(ctx) {
    return {
      queryString: ctx.params.queryString,
    }
  },
}
</script>

<style></style>
