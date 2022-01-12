<template>
  <div class="aabbcc">
    <el-popover
      width="200"
      trigger="hover"
      content="Hello world from element ui popover"
    >
      <template #reference>
        <el-button
          size="mini"
          type="primary"
        >{{data}} from vue!</el-button>
      </template>

    </el-popover>

  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    data: {
      type: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
