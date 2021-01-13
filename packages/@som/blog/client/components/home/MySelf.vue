<template>
  <div class="px-4 space-y-3">
    <div class="space-y-4">
      <div class="font-semibold">About icebreaker</div>
      <div class="text-sm text-gray-800">
        <div>某热爱技术的小码农一枚</div>
        <!-- <OutSideLink href="https://www.shareplus.cn/"></OutSideLink> -->
        <div>对Vue/Nuxt,小程序,nodejs等有较深入的理解</div>
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
  </div>
</template>

<script>
import toEmoji from 'gemoji/name-to-emoji.json'
import SomPlayer from '../global/SomPlayer.vue'

export default {
  name: 'MySelf',
  components: { SomPlayer },
  data() {
    return {
      joy: toEmoji.joy,
      rofl: toEmoji.rofl,
      smirk: toEmoji.smirk,
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
    // openVideo() {},
  },
}
</script>
