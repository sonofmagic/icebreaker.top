<template>
  <section class="container mx-auto py-8">
    <client-only>
      <el-tabs stretch type="border-card" tab-position="left">
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
        >
          <component :is="tab.is"></component>
        </el-tab-pane>
      </el-tabs>
    </client-only>
  </section>
</template>

<script>
import Account from '@/components/profile/Account'
import BaseInfo from '@/components/profile/BaseInfo'
const tabsLabel = ['基础信息', '账号信息']
const tabs = ['BaseInfo', 'Account'].map((x, idx) => {
  return {
    name: idx.toString(),
    is: x,
    label: tabsLabel[idx],
  }
})

export default {
  name: 'ProfileIndex',
  components: {
    Account,
    BaseInfo,
  },
  data() {
    return {
      tabs,
    }
  },
  computed: {},
}
</script>

<style lang="scss" scoped></style>
