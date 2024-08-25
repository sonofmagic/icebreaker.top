<script>
// const { nameToEmoji } = require('gemoji')
// import { nameToEmoji } from 'gemoji'
// import SomPlayer from '../global/SomPlayer.vue'
import MiniPrograms from './MiniPrograms'
import { wechat } from '@/assets/img/cloud'
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
      icebreakerQrcodeUrl: wechat.myQrcode2,
      // darkMode: false,
      // ls,
      // langs: [
      //   ['fab', 'html5'],
      //   ['fab', 'css3-alt'],
      //   ['fab', 'js-square'],
      // ],
      // skills: [
      //   ['fab', 'node'],
      //   ['fab', 'vuejs'],
      //   ['fab', 'npm'],
      //   ['fab', 'yarn'],
      //   ['fab', 'git-square'],
      // ],
    }
    return refs
  },
}
</script>

<template>
  <div class="space-y-3 px-4">
    <!-- <div class="flex items-center">
      <span class="text-sm mr-4">Dark Mode</span>
      <el-switch v-model="theme"> </el-switch>
    </div> -->
    <div class="space-y-1">
      <div class="font-semibold">
        About icebreaker.top
      </div>
      <div class="text-xs text-gray-800">
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
        <div>
          Powered by
          <OutSideLink href="https://docs.cloudbase.net/">
            CloudBase
          </OutSideLink>
          <span class="mx-0.5">&</span>
          <OutSideLink href="https://www.serverless.com/">
            Serverless
          </OutSideLink>
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">
        About
        <span
          class="text-blue-600 cursor-pointer hover:underline"
          @click.stop="icebreakerQrcodeVisible = true"
        >icebreaker</span>
      </div>
      <div class="text-sm text-gray-800">
        <div>某热爱技术的打字员一枚</div>
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div>对Vue/Nuxt,小程序,nodejs等有较深入的理解</div>
        <div>擅长扯淡,吹牛,撕x</div>

        <div class="mt-2 flex">
          <div
            class="npx-command flex cursor-pointer items-center rounded-md border border-solid border-[#cccccc] py-2 pl-3 pr-5 hover:border-[#00C642] hover:bg-[rgb(219,255,219)]"
            @click="copyText('npx yangqiming@latest')"
          >
            <span>
              <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </span>

            <pre class="ml-2">npx yangqiming@latest</pre>
            <span class="copy-icon">
              <FontAwesomeIcon :icon="['far', 'copy']" />
            </span>
          </div>
        </div>
        <!-- <div>
          <OutSideLink href="https://www.shareplus.cn/">Shareplus</OutSideLink>
        </div> -->
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">
        Languages
      </div>
      <div class="text-sm">
        <ul class="list-inside list-decimal">
          <li>js/c#</li>
          <li>中文/English</li>
        </ul>

        <!-- <FontAwesomeIcon
          v-for="(icon, idx) in langs"
          :key="idx"
          size="2x"
          :icon="icon"
          class="mr-2 text-blue-400"
        /> -->
      </div>
    </div>
    <div class="space-y-2">
      <div class="font-semibold">
        Skills
      </div>
      <div class="text-sm">
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
      <div class="font-semibold">
        Mini Programs
      </div>
      <div>
        <MiniPrograms />
      </div>
    </div>
    <!-- <som-player></som-player> -->
    <!-- <a @click="openVideo">video</a> -->
    <SomPopup v-model="icebreakerQrcodeVisible">
      <div class="px-4 text-center">
        <div class="text-gray-900 text-opacity-75">
          打开微信扫一扫以下二维码
        </div>
        <SomImage class="h-64 w-64" :src="icebreakerQrcodeUrl" />
        <div class="mb-2 text-gray-900 text-opacity-75">
          或者手动添加微信号：
        </div>
        <div
          class="hover:bg-green-100 flex cursor-pointer items-center justify-center truncate rounded border border-solid border-gray-400 py-2"
          @click="copyText('icebreaker1995')"
        >
          <span class="text-gray-900">icebreaker1995<FontAwesomeIcon
            class="ml-2"
            size="sm"
            :icon="['far', 'copy']"
          /></span>
        </div>
      </div>
    </SomPopup>
  </div>
</template>

<style lang="scss" scoped>
.npx-command {
  @apply relative;
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
</style>
