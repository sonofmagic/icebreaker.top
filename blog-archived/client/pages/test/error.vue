<script>
export default {
  name: 'TestError',
  asyncData(ctx) {
    if (process.server) {
      // throw new Error('hello world')
      // return ctx.error({
      //   message: 'ccav',
      //   path: 'this is path',
      //   statusCode: 404,
      // })
      // throw new Error('sentry test')
    }
  },
}
</script>

<template>
  <div>Throw Error</div>
</template>

<style></style>
