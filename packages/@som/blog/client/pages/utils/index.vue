<template>
  <section>
    <div class="flex justify-center pt-4 text-lg">
      <h1 class="font-light">帮助开发的小工具们</h1>
    </div>
    <div class="container mx-auto py-4">
      <div class="grid grid-cols-3 gap-4">
        <LinkCard
          v-for="u in utils"
          :key="u.url"
          :to="u.url"
          out-side
          :title="u.title"
          :desc="u.desc"
        ></LinkCard>
        <LinkCard
          to="/utils/md2cwm"
          title="md2cwm 工具"
          desc="Markdown 转 Confluence Wiki Markup"
        ></LinkCard>
      </div>
    </div>
  </section>
</template>

<script>
// 抄 https://www.tslang.cn/samples/index.html 的风格

import LinkCard from '@/components/utils/LinkCard.vue'
export default {
  name: 'UtilsIndex',
  components: {
    LinkCard,
  },
  layout: 'noWrapper',
  data() {
    return {
      utils: [
        {
          url: 'https://regex101.com/',
          title: 'regex101',
          desc: 'regex101',
        },
        {
          url: 'https://regexr.com/',
          title: 'regexr',
          desc: 'regexr',
        },
        {
          url: 'https://regexper.com/',
          title: 'regexper',
          desc: 'regexper',
        },
        {
          url: 'http://nodeca.github.io/js-yaml/',
          title: 'JS-YAML',
          desc: 'Yaml和Js相互转化,配置运维工具链用',
        },
        {
          url: 'https://eslint.org/demo',
          title: 'Eslint demo',
          desc: 'eslint规则测试',
        },
        {
          url: 'https://www.postcss.parts/',
          title: 'PostCSS plugins',
          desc: 'PostCSS插件集合',
        },
        {
          url: 'https://stylelint.io/demo',
          title: 'Stylelint demo',
          desc: 'stylelint规则测试',
        },
        {
          url: 'https://rollupjs.org/guide/en/#big-list-of-options',
          title: 'Rollupjs option 速查',
          desc: '用rollup开发速查打包配置',
        },
        {
          url: 'https://webpack.js.org/configuration/',
          title: 'Webpack option 速查',
          desc: '配置项更改要看',
        },
        {
          url: 'https://nodejs.org/dist/latest-v14.x/docs/api/',
          title: 'Node LTS Api 速查',
          desc: 'Node Api 参考',
        },
        {
          url: 'http://mongodb.github.io/node-mongodb-native/3.6/api/',
          title: 'MongoDB Node.JS Driver Api 速查',
          desc: '可能打不开，上 https://docs.mongodb.com/drivers/node/',
        },
        {
          url: 'https://babeljs.io/repl',
          title: 'Babel交互环境',
          desc: '要科学上网，用来调整Plugins和Preset',
        },
        {
          url: 'https://www.typescriptlang.org/play',
          title: 'Ts交互环境',
          desc: 'C#之父的又一力作',
        },
        {
          url: 'https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions',
          title: 'Github workflow配置参考',
          desc: 'Github CI',
        },
      ],
    }
  },
}
</script>

<style></style>
