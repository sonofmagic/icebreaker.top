<template>
  <div>Throw Error</div>
</template>

<script>
export default {
  name: 'TestError',
  asyncData(ctx) {
    if (process.server) {
      // throw new Error('hello world')
      return ctx.error({
        message: 'ccav',
        path: 'this is path',
        statusCode: 404,
      })
    }
  },
}
</script>

<style></style>
