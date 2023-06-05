<template>
  <section class="container mx-auto py-4">
    <div
      class="flex flex-col items-center justify-between px-4 text-xs text-gray-600 dark:text-primary-600 sm:flex-row">
      <div>
        <span class="mr-4">© {{ fullYear }} ice breaker</span>
        <a target="_blank" rel="nofollow" href="http://beian.miit.gov.cn">
          苏ICP备19002675号-2
        </a>
      </div>
      <div>version:{{ version }}</div>
      <!-- <div> -->
      <!-- <nuxt-link class="mr-5" to="/sitemap">站点地图</nuxt-link> -->
      <!-- <OutSideLink class="text-base hover:text-gray-700 mr-5" raw href="https://github.com/sonofmagic/icebreaker.top">
          <FontAwesomeIcon :icon="['fab', 'github']" />
        </OutSideLink> -->
      <!-- Powered by
        <OutSideLink href="https://docs.cloudbase.net/">
          CloudBase
        </OutSideLink>
        <span class="mx-1">&</span>
        <OutSideLink href="https://www.serverless.com/">
          Serverless
        </OutSideLink> -->
      <!-- </div> -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import { version } from '~~/package.json'

const fullYear = new Date().getFullYear()
</script>
