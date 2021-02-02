<template>
  <div class="px-4 space-y-3">
    <div class="space-y-4">
      <div class="font-semibold">
        About
        <span
          class="cursor-pointer hover:text-blue-600 hover:underline"
          @click.stop="icebreakerQrcodeVisible = true"
          >icebreaker</span
        >
      </div>
      <div class="text-sm text-gray-800">
        <div>某热爱技术的小码农一枚</div>
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div>对Vue/Nuxt,小程序,nodejs等有较深入的理解</div>
        <div>
          <OutSideLink href="https://www.shareplus.cn/">Shareplus</OutSideLink>
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div class="font-semibold">Languages</div>
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
    <div class="space-y-4">
      <div class="font-semibold">Skills</div>
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
    <!-- <som-player></som-player> -->
    <!-- <a @click="openVideo">video</a> -->
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
          class="flex justify-center items-center rounded border border-solid border-gray-400 py-2 truncate cursor-pointer hover:bg-green-100"
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
import toEmoji from 'gemoji/name-to-emoji.json'
// import SomPlayer from '../global/SomPlayer.vue'
import { wechat } from '@/assets/img/cloud'
// import copy from 'copy-text-to-clipboard'
import { Toast } from 'vant'
let copy
if (process.browser) {
  copy = require('copy-text-to-clipboard').default
}
export default {
  name: 'MySelf',
  components: {},
  data() {
    return {
      joy: toEmoji.joy,
      rofl: toEmoji.rofl,
      smirk: toEmoji.smirk,
      icebreakerQrcodeVisible: false,
      icebreakerQrcodeUrl: wechat.myQrcode2,
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
  },
  methods: {
    copyText(text) {
      copy(text)
      Toast.success('复制成功!')
    },
    // openVideo() {},
  },
}
</script>
