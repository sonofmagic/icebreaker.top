<template>
  <div class="a-dark-soul space-y-3">
    <div class="space-y-2">
      <div class="font-semibold">About icebreaker.top</div>
      <div class="text-xs">
        <div>
          Hosted on
          <OutSideLink href="https://cloud.tencent.com/product/cdn"
            >[Tencent Cloud CDN]</OutSideLink
          >
        </div>
        <div>
          Deployed by
          <OutSideLink href="https://docs.github.com/en/actions"
            >[GitHub Actions]</OutSideLink
          >
        </div>
        <div>
          Powered by
          <OutSideLink href="https://docs.cloudbase.net/">
            [CloudBase]
          </OutSideLink>
          <span class="mx-0.5">&</span>
          <OutSideLink href="https://www.serverless.com/">
            [Serverless]
          </OutSideLink>
        </div>
        <div>
          <OutSideLink
            class="text-base hover:text-gray-400 mr-1"
            raw
            href="https://github.com/sonofmagic"
          >
            <FontAwesomeIcon :icon="['fab', 'github']" />
          </OutSideLink>
          <OutSideLink href="https://github.com/sonofmagic/icebreaker.top">
            [Source Code]
          </OutSideLink>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">
        About
        <span
          class="cursor-pointer hover:underline"
          @click.stop="icebreakerQrcodeVisible = true"
          >icebreaker</span
        >
      </div>
      <div>
        <div>某热爱技术的打字员一枚</div>
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div>
          对Vue/Nuxt,React,uni-app,小程序,nodejs,serverless等有较深入的理解
        </div>
        <div>擅长扯淡,吹牛,撕x</div>

        <div class="flex mt-2">
          <div class="npx-command" @click="copyText('npx yangqiming')">
            <span>
              <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </span>

            <pre class="ml-2">npx yangqiming</pre>
            <span class="copy-icon">
              <FontAwesomeIcon :icon="['far', 'copy']" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Languages</div>
      <div>
        <ul class="list-inside list-decimal">
          <li>js/c#</li>
          <li>中文/English</li>
        </ul>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">Skills</div>
      <div>
        <ul class="list-inside list-decimal">
          <li>专心快速成型{{ smirk }}</li>
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
      <div class="font-semibold">Mini Programs</div>
      <div>
        <MiniPrograms></MiniPrograms>
      </div>
    </div>
    <SomPopup v-model="icebreakerQrcodeVisible">
      <div class="text-center px-4">
        <div class="text-gray-900 text-opacity-75">
          打开微信扫一扫以下二维码
        </div>
        <SomImage class="w-64 h-64" :src="icebreakerQrcodeUrl"></SomImage>
        <div class="mb-2 text-gray-900 text-opacity-75">
          或者手动添加微信号：
        </div>
        <div
          class="
            flex
            justify-center
            items-center
            rounded
            border border-solid border-gray-400
            py-2
            truncate
            cursor-pointer
            hover:bg-green-100
          "
          @click="copyText('icebreaker1995')"
        >
          <span class="text-gray-900"
            >icebreaker1995<FontAwesomeIcon
              class="ml-2"
              size="sm"
              :icon="['far', 'copy']"
            ></FontAwesomeIcon
          ></span>
        </div>
      </div>
    </SomPopup>
  </div>
</template>

<script>
import { wechat } from '@/assets/img/cloud'
import copyTextMixin from '@/mixins/copyTextMixin'
export default {
  name: 'MySelf',
  components: {},
  mixins: [copyTextMixin],
  data() {
    const refs = {
      joy: '😂', // nameToEmoji.joy,
      rofl: '🤣', // nameToEmoji.rofl,
      smirk: '😏', // nameToEmoji.smirk,
      icebreakerQrcodeVisible: false,
      icebreakerQrcodeUrl: wechat.myQrcode2,
    }

    return refs
  },
}
</script>
<style lang="scss" scoped>
.a-dark-soul {
  @apply text-fg-default text-sm;
  .npx-command {
    @apply relative flex
              items-center
              rounded-md
              py-2
              pl-3
              pr-5
              border border-solid border-[#cccccc]
              cursor-pointer
              hover:bg-[rgb(219,255,219)] hover:border-[#00C642] hover:text-black/80 text-white/80;
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
