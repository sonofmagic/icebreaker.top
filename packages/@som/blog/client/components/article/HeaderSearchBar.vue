<template>
  <!-- <el-select
    v-model="searchText"
    filterable
    remote
    placeholder="Search or jump to…"
    size="mini"
    :loading="loading"
    :remote-method="searchByTitle"
    class="header-search-wrapper"
  >
    <el-option
      v-for="item in options"
      :key="item.path"
      :label="item.title"
      :value="item.path"
    >
    </el-option>
  </el-select> -->
  <el-autocomplete
    v-model="searchText"
    :fetch-suggestions="searchByTitle"
    placeholder="Search or jump to…"
    size="mini"
    class="header-search-wrapper"
    :debounce="300"
    highlight-first-item
    :trigger-on-focus="false"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <div class="flex justify-between items-center">
        <div class="truncate">{{ item.title }}</div>
        <div class="text-sm text-gray-600">{{ item.date | dayFilter }}</div>
      </div>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  name: 'HeaderSearchBar',
  data() {
    return {
      searchText: '',
      options: [],
      loading: false,
    }
  },
  methods: {
    async searchByTitle(queryString, cb) {
      const options = await this.$content('articles', {
        deep: true,
      })
        .sortBy('date', 'desc')
        .only(['title', 'tags', 'date', 'slug'])
        .limit(6)
        .search(queryString)
        .fetch()

      cb(options)
    },
    handleSelect(item) {
      this.$router.push(item.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.header-search-wrapper {
  ::v-deep .el-input {
    > .el-input__inner {
      background-color: #3f4448;
      border: none;
      width: 272px;
      transition: width 0.2s ease-in-out;
      color: #fff;
      // &:focus {
      //   width: 544px;
      // }
    }
  }
}
</style>
