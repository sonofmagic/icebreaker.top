<template>
  <div class="px-4 space-y-3">
    <!-- <div class="flex items-center">
      <span class="text-sm mr-4">Dark Mode</span>
      <el-switch v-model="theme"> </el-switch>
    </div> -->
    <div class="space-y-1">
      <div class="font-semibold">About icebreaker.top</div>
      <div class="text-xs text-gray-800">
        <div>
          Hosted on
          <OutSideLink href="https://cloud.tencent.com/product/cdn"
            >Tencent Cloud CDN</OutSideLink
          >
        </div>
        <div>
          Deployed by
          <OutSideLink href="https://docs.github.com/en/actions"
            >GitHub Actions</OutSideLink
          >
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
          class="cursor-pointer text-blue-600 hover:underline"
          @click.stop="icebreakerQrcodeVisible = true"
          >icebreaker</span
        >
      </div>
      <div class="text-sm text-gray-800">
        <div>某热爱技术的打字员一枚</div>
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div>对Vue/Nuxt,小程序,nodejs等有较深入的理解</div>
        <div>擅长扯淡,吹牛,撕x</div>

        <div class="flex mt-2">
          <div
            class="
              flex
              items-center
              rounded-md
              py-2
              pl-3
              pr-5
              border border-solid border-[#cccccc]
              cursor-pointer
              hover:bg-[rgb(219,255,219)] hover:border-[#00C642]
              npx-command
            "
            @click="copyText('npx yangqiming')"
          >
            <span>
              <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
            </span>

            <pre class="ml-2">npx yangqiming</pre>
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
    <div class="space-y-2">
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
    <div class="space-y-2">
      <div class="font-semibold">Mini Programs</div>
      <div>
        <MiniPrograms></MiniPrograms>
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
// const { nameToEmoji } = require('gemoji')
// import { nameToEmoji } from 'gemoji'
// import SomPlayer from '../global/SomPlayer.vue'
import { wechat } from '@/assets/img/cloud'
import copyTextMixin from '@/mixins/copyTextMixin'
export default {
  name: 'MySelf',
  components: {},
  mixins: [copyTextMixin],
  data() {
    // let ls
    // if (process.client) {
    //   ls = new Proxy(window.localStorage, (t, arg, nt) => {
    //     console.log(t, arg, nt)
    //   })
    // }
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
    // if (process.client) {
    //   if (!localStorage.theme && !localStorage.seted_theme) {
    //     localStorage.theme = 'dark'
    //     localStorage.seted_theme = 1
    //   }
    //   refs.darkMode = localStorage.getItem('theme') === 'dark'
    // }
    return refs
  },
  // computed: {
  //   theme: {
  //     get() {
  //       // if (process.client) {
  //       //   return this.darkMode // localStorage.getItem('theme')
  //       // }

  //       return this.darkMode
  //     },
  //     set(nv) {
  //       if (process.client) {
  //         localStorage.setItem('theme', nv ? 'dark' : 'light')
  //       }
  //       this.darkMode = nv
  //     },
  //   },
  // },
  // watch: {
  //   // very lazy
  //   darkMode() {
  //     this.checkMode()
  //   },
  // },
  // mounted() {
  //   this.checkMode()
  // },
  // methods: {
  //   checkMode() {
  //     if (
  //       localStorage.theme === 'dark' ||
  //       (!('theme' in localStorage) &&
  //         window.matchMedia('(prefers-color-scheme: dark)').matches)
  //     ) {
  //       document.documentElement.classList.add('dark')
  //     } else {
  //       document.documentElement.classList.remove('dark')
  //     }
  //   },
  // },
}
</script>
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
