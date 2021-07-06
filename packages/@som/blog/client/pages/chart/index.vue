<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto">
      <van-notice-bar
        left-icon="volume-o"
        text="此页面为图表索引主页，主要展示一些图表"
      />
      <van-cell-group title="图表索引">
        <van-cell
          v-for="link in chartLinks"
          :key="link.href"
          :title="link.title"
          :label="link.label"
          :value="link.value"
          is-link
          @click.stop="$router.push(`/chart/${link.href}`)"
        >
          <template v-if="link.tag">
            <van-tag :type="link.tag.type">{{ link.tag.text }}</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartLinks: [
        {
          title:
            '腾讯云SCF云函数压力测试 event函数，web函数，web-custom-image函数图表',
          label: 'scf-event-vs-web-vs-custom-image压测图表',
          href: 'scf-event-vs-web-vs-custom-image',
          tag: {
            type: 'success',
            text: '压力测试',
          },
        },
      ],
    }
  },
}
</script>

<style></style>
