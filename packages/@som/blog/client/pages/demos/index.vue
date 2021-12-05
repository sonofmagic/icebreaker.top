<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto">
      <van-notice-bar
        left-icon="volume-o"
        text="此页面为Demo页，用来展示一些文章内写的效果"
      />
      <van-cell-group title="图表索引">
        <van-cell
          v-for="link in demosLinks"
          :key="link.href"
          :title="link.title"
          :label="link.label"
          :value="link.value"
          is-link
          @click.stop="$router.push(`${link.href}`)"
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
  name: 'DemosIndex',
  data() {
    return {
      demosLinks: [
        // {
        //   title: '在serverless环境下构建canvas来处理和生成图像',
        //   label: 'serverless-canvas',
        //   href: '/demos/serverless-canvas',
        //   // tag: {
        //   //   type: 'success',
        //   //   text: '压力测试',
        //   // },
        // },
        // {
        //   title: 'serverless ascii',
        //   label: 'serverless-canvas(2)',
        //   href: '/demos/ascii',
        // },
        {
          title: '批量生成并压缩二维码',
          label: '批量生成并压缩二维码',
          href: '/batch/qrcode',
        },
      ],
    }
  },
}
</script>
