<template>
  <section class="container mx-auto py-2">
    <div
      class="flex flex-col sm:flex-row justify-between items-center px-4 text-gray-600 text-xs dark:text-accents-600"
    >
      <div>
        <span class="mr-4">© {{ fullYear }} icebreaker</span>
        <a target="_blank" rel="nofollow" href="http://beian.miit.gov.cn"
          >苏ICP备19002675号-2</a
        >
      </div>
      <div>version:{{ version }}</div>
      <div>
        <nuxt-link class="mr-5" to="/sitemap">站点地图</nuxt-link>
        <OutSideLink
          class="text-base hover:text-gray-700 mr-5"
          raw
          href="https://github.com/sonofmagic/icebreaker.top"
        >
          <FontAwesomeIcon :icon="['fab', 'github']" />
        </OutSideLink>
        Powered by
        <OutSideLink href="https://docs.cloudbase.net/">
          CloudBase
        </OutSideLink>
        <span class="mx-1">&</span>
        <OutSideLink href="https://www.serverless.com/">
          Serverless
        </OutSideLink>
      </div>
    </div>
  </section>
</template>

<script>
import { version } from '~~/package.json'
export default {
  name: 'AppFooter',
  data: () => ({
    fullYear: new Date().getFullYear(),
    version,
  }),
}
</script>
