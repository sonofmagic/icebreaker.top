<template>
  <div class="container mx-auto">
    <Sitemap :hidden="false">
      <template #default="{ data }">
        <van-grid>
          <van-grid-item v-for="item in data" :key="item.id">
            <template #default>
              <nuxt-link :to="item.path">
                <div class="flex flex-col">
                  <div>{{ item.title }}</div>

                  <template v-if="Array.isArray(item.tags)">
                    <div class="space-x-2">
                      <van-tag
                        v-for="(tag, idx) in item.tags"
                        :key="tag"
                        :type="getTagType(idx)"
                        >{{ tag }}</van-tag
                      >
                    </div>
                  </template>
                </div>
              </nuxt-link>
            </template>
          </van-grid-item>
        </van-grid>
      </template>
    </Sitemap>
  </div>
</template>

<script>
import Sitemap from '@/components/sitemap/index.vue'
// default
const tagTypeMap = ['primary', 'success', 'danger', 'warning']
export default {
  components: {
    Sitemap,
  },
  methods: {
    getTagType(idx = 0) {
      return tagTypeMap[idx % tagTypeMap.length] || 'default'
    },
  },
}
</script>

<style></style>
