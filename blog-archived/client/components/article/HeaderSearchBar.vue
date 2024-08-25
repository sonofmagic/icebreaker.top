<script>
import { mapGetters } from 'vuex'
import SignInPopup from '@/components/layout/SignInPopup'

export default {
  name: 'HeaderSearchBar',
  components: { SignInPopup },
  data() {
    return {
      searchText: '',
      options: [],
      loading: false,
      signInVisible: false,
    }
  },
  computed: {
    ...mapGetters('user', ['isRealLogined']),
  },
  methods: {
    async searchByTitle(queryString, cb) {
      if (this.isRealLogined) {
        const options = await this.$content('articles', {
          deep: true,
        })
          .sortBy('date', 'desc')
          .only(['title', 'tags', 'date', 'slug'])
          .limit(6)
          .search(queryString)
          .fetch()

        cb(options)
      }
      else {
        cb([
          {
            needLogin: true,
          },
        ])
      }
    },
    handleSelect(item) {
      if (item.needLogin) {
        this.signInVisible = true
      }
      else {
        this.$router.push(item.path)
      }
    },
  },
}
</script>

<template>
  <div>
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
        <div class="flex items-center justify-between">
          <template v-if="item.needLogin">
            <div class="text-blue-500">
              Click here for Login
            </div>
          </template>
          <template v-else>
            <div class="truncate">
              {{ item.title }}
            </div>
            <div class="text-sm text-gray-600">
              {{ item.date | dayFilter }}
            </div>
          </template>
        </div>
      </template>
    </el-autocomplete>
    <SignInPopup v-model="signInVisible" />
  </div>
</template>

<style lang="scss" scoped>
.header-search-wrapper {
  ::v-deep .el-input {
    > .el-input__inner {
      @apply h-[30px] w-[272px] border border-solid border-header-search-border bg-header-search-bg px-3 text-sm leading-[30px] text-scale-white;
      // background-color: #3f4448;
      // border: none;

      transition: width 0.2s ease-in-out;
      //color: #fff;
      // &:focus {
      //   width: 544px;
      // }
    }
  }
}
</style>
