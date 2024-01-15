<template>
  <div class="a-dark-soul space-y-3 py-4">
    <div class="space-y-2">
      <div class="font-semibold">About icebreaker.top</div>
      <div class="text-xs">
        <div>
          Hosted on
          <OutSideLink href="https://cloud.tencent.com/product/cdn">
            Tencent Cloud CDN
          </OutSideLink>
        </div>
        <div>
          Deployed by
          <OutSideLink href="https://docs.github.com/en/actions">
            GitHub Actions
          </OutSideLink>
        </div>
        <div class="line-through">
          Powered by
          <OutSideLink href="https://docs.cloudbase.net/">
            CloudBase
          </OutSideLink>
          <span class="mx-0.5">&</span>
          <OutSideLink href="https://www.serverless.com/">
            Serverless
          </OutSideLink>
        </div>
        <div>
          Powered by
          <OutSideLink href="https://github.com/supabase/supabase">
            Supabase
          </OutSideLink>
          <span class="mx-0.5">&</span>
          <OutSideLink href="https://www.docker.com/">Docker</OutSideLink>
        </div>
        <div>
          <OutSideLink
            class="mr-1 text-base hover:text-gray-400"
            raw
            href="https://github.com/sonofmagic">
            <FontAwesomeIcon :icon="['fab', 'github']" />
          </OutSideLink>
          <OutSideLink href="https://github.com/sonofmagic/icebreaker.top">
            Source Code
          </OutSideLink>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">
        About
        <span
          class="cursor-pointer hover:underline"
          @click.stop="icebreakerQrcodeVisible = true">
          icebreaker
        </span>
      </div>
      <div>
        <!-- 执行下方命令就知道了 -->
        <!-- <div>某热爱技术的打字员一枚</div>

        <div>
          对Vue/Nuxt,React,uni-app,小程序,nodejs,serverless等有较深入的理解
        </div>
        <div>擅长扯淡,吹牛,撕x</div> -->
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div class="mt-2 flex">
          <div class="npx-command" @click="copyText('npx sonofmagic@latest')">
            <span>
              <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </span>

            <pre class="ml-2">npx sonofmagic@latest</pre>
            <span class="copy-icon">
              <FontAwesomeIcon :icon="['far', 'copy']" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="space-y-2">
      <div class="font-semibold">Languages</div>
      <div>
        <ul class="list-inside list-decimal">
          <li>js/c#</li>
          <li>中文/English</li>
        </ul>
      </div>
    </div> -->
    <div class="space-y-2">
      <div class="font-semibold">Skills</div>
      <div>
        <ul class="list-inside list-decimal">
          <li>快速成型{{ smirk }}</li>
          <li>各大搜索引擎专长{{ joy }}</li>
          <li>技术文档,源码,发帖提问 {{ joy }}</li>
          <li>脸皮厚{{ rofl }}</li>
        </ul>

        <!-- <FontAwesomeIcon
          v-for="(icon, idx) in skills"
          :key="idx"
          size="2x"
          :icon="icon"
          class="mr-2 text-blue-400"
        /> -->
      </div>
    </div>
    <div class="space-y-2">
      <div class="flex font-semibold">
        <div
          class="cursor-pointer hover:underline"
          @click="$router.push('/mp')">
          My Mini Programs (Click Here)
        </div>
      </div>
      <div>
        <MiniPrograms></MiniPrograms>
      </div>
    </div>
    <SomPopup v-model="icebreakerQrcodeVisible">
      <div class="px-4 text-center">
        <div class="text-gray-900 text-opacity-75">
          打开微信扫一扫以下二维码
        </div>
        <SomImage class="w-64" :src="icebreakerQrcodeUrl"></SomImage>
        <div class="mb-2 text-gray-900 text-opacity-75">
          或者手动添加微信号：
        </div>
        <div
          class="hover:bg-green-100 flex cursor-pointer items-center justify-center truncate rounded border border-solid border-gray-400 py-2"
          @click="copyText('icebreaker1995')">
          <span class="text-gray-900">
            icebreaker1995
            <FontAwesomeIcon
              class="ml-2"
              size="sm"
              :icon="['far', 'copy']"></FontAwesomeIcon>
          </span>
        </div>
      </div>
    </SomPopup>
  </div>
</template>

<script>
import MiniPrograms from './MiniPrograms'
// import { wechat } from '@/assets/img/cloud'
import wechatMyQrcode from '@/assets/img/wechat.jpg'
import copyTextMixin from '@/mixins/copyTextMixin'
export default {
  name: 'MySelf',
  components: {
    MiniPrograms,
  },
  mixins: [copyTextMixin],
  data() {
    const refs = {
      joy: '😂', // nameToEmoji.joy,
      rofl: '🤣', // nameToEmoji.rofl,
      smirk: '😏', // nameToEmoji.smirk,
      icebreakerQrcodeVisible: false,
      icebreakerQrcodeUrl: wechatMyQrcode, // wechat.myQrcode2,
    }

    return refs
  },
}
</script>
<style lang="scss">
[data-color-mode='light'] {
  .a-dark-soul {
    .npx-command {
      @apply text-black/80 #{!important};
    }
  }
}
</style>
<style lang="scss" scoped>
.a-dark-soul {
  @apply text-sm text-fg-default;
  .npx-command {
    @apply relative flex
              cursor-pointer
              items-center
              rounded-md
              border
              border-solid
              border-[#cccccc] py-2 pl-3
              pr-5
              text-white/80 hover:border-[#00C642] hover:bg-[rgb(219,255,219)] hover:text-black/80;
    .copy-icon {
      @apply absolute right-1 opacity-0 transition-opacity;
      //
    }
    &:hover {
      .copy-icon {
        @apply opacity-100;
      }
    }
  }
}
</style>
