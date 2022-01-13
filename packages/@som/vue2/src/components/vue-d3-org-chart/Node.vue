<template>
  <div class="card">
    <div style="min-width:80px">
      <div>{{name}}</div>
      <div>
        <img
          height="50"
          :src="data.data.imageUrl"
        >
      </div>
    </div>
    <div>
      <el-input
        size="mini"
        v-model="name"
      ></el-input>
      <el-rate
        size="mini"
        v-model="value1"
      ></el-rate>
      <el-checkbox v-model="checked" size="mini">复选</el-checkbox>
      <el-popover
        width="200"
        trigger="hover"
        content="Hello world from d3.js with vue + element ui popover"
      >
        <template #reference>
          <el-button
            size="mini"
            type="primary"
          >操作</el-button>
        </template>

      </el-popover>
    </div>

    <!-- <el-upload
      size="mini"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload> -->
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    data: {},
    index: {
      type: [Number]
    }
  },
  data () {
    return {
      name: this.data.data.name,
      value1: this.index % 5,
      checked: (this.index % 2 === 0)
    }
  }
}
</script>

<style lang="scss">
.card {
  box-sizing: border-box;
  border: 1px solid black;
  width: 240px;
  height: 120px;
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  padding: 8px 10px;
}
</style>
