
# 令人愉快的 Nuxt3 教程 (二): 快速轻松地搭建博客

继 [令人愉快的 Nuxt3 教程 (一): 应用的创建与配置](https://juejin.cn/post/7114476679598178312) 后，我们已经成功的创建了一个 `Nuxt3` 应用，同时已经添加了大量的开发配置。

有道是 `纸上得来终觉浅，绝知此事要躬行`。接下来本文章将通过快速的搭建一个博客系统来学习 `Nuxt3`。各位开发者们看到这里也不用觉得害怕，因为这项工程，在众多现成的 `npm` 包加成下，已经变的非常的简单了。

本章节将会主要使用 `nuxt` 团队打造的 `@nuxt/content`，它可以便捷的搭建一个内容管理系统。和那些 `vuepress`/`vitepress` 快速部署静态网站的生成器不同，`@nuxt/content` 它只为我们提供了一套 `markdown` 文件的渲染的机制，和围绕它进行一些数据交互的 `api` 和组件，因此这个方案自定义程度很高。

现在就让我们直接开始实践吧。

## 内容管理之旅

### 安装与注册

```bash
yarn add -D @nuxt/content
```

安装好后，在 `nuxt.config.ts` 的 `modules` 配置中注册，添加：

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
})
```

> 注意：此时你在 `*.vue` 的 `script setup` 代码块中直接使用 `queryContent()` 这类的 `composables` 时，`eslint` 会报错，同时也没有相应的`ts`智能提示。这是因为很多 `nuxt3` 中的临时文件，包括 `*.d.ts` 这种都是动态生成在 `.nuxt` 目录下的。所以 `@nuxt/content` 的全局智能提示 `*.d.ts` 也需要先 `yarn dev` 运行一下，才会被引入到 `.nuxt/nuxt.d.ts` 中去(`tsconfig.json`同理)。所以添加完 `modules` 后先运行一下吧！

### 创建你的文章目录

`@nuxt/content` 自身也是基于约定式的目录结构来构建数据的。接下来我们在项目目录下，建立一个 `content` 目录，并在其中创建一个 `index.md` 文件，添加内容：

```md
# 短歌行

对酒当歌，人生几何！
譬如朝露，去日苦多。
```

接着，我们只需要在 `app.vue` 中直接添加 `@nuxt/content` 的组件 `ContentDoc` 即可(不需要手动引入，已经按需注册了)：

```html
<template>
  <main>
    <ContentDoc />
  </main>
</template>
```

接着执行 `yarn dev` 即可在开发环境中预览效果:

![Image](https://pic4.zhimg.com/80/v2-93b2f17dd4ed18115acb4308c04d6037.png)

> 默认启动的端口号为 `3000`，可通过修改环境变量来更改 `host` 和 `port`，`cross-env PORT=8080 nuxt preview`，详见 [configuring-defaults-at-runtime](https://v3.nuxtjs.org/guide/deploy/node-server/#configuring-defaults-at-runtime)


## 自定义文章样式

我们在看到上图中的预览效果的时候，发现一个问题，`# 短歌行` 虽然被渲染成一个 `h1` 标签，它却并没有像我们预想的那样，字体比正文的 `p` 标签大，这是为什么呢？

在上一章节，我们引入了 `tailwindcss`，其中 `tailwindcss/base` 中有一个 `preflight` 机制，它会注入一些全局样式，来统一不同浏览器的默认标签样式。 

比如像 `h1`,`h2`,`h3` 这类标签，原先编写后，浏览器默认会给它们不同的字体大小。引入 `tailwindcss/base` 后，浏览器给的样式被覆盖和统一，所以这些标签就都一样大了，我们称之为 `css normalize`。

比如你编写如下一段 `md`
```md
# 愉快的 Nuxt3 开发体验

## 安装 npm 包

### nuxt 团队

#### unjs 组织
```

浏览器呈现后，发现字都是一样大的，这样就看不出文章标题的层级。此时你就需要一些专门为文章展示场景设计 [`typography-plugin`](https://tailwindcss.com/docs/typography-plugin) 了。接下来让我开始安装：

```bash
yarn add -D @tailwindcss/typography
```

接着在 `tailwind.config.js` 中注册它:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```

此时你就可以使用 `prose` 相关的原子化 `class` 来美化你的文章内容了，它会给你编写的文章内容添加预设的样式。只需在我们的 `ContentDoc` 添加属性: `<ContentDoc class="prose" />` 即可呈现效果。

![Image](https://pic4.zhimg.com/80/v2-9ad0099818015ef82c803c0c1ea0900b.png)

## 代码染色

作为一名程序员，写的文章里面，通常会包含各种各样的代码，没有代码染色可不行。幸好 `@nuxt/content` 中已经为我们准备好了代码染色工具: [`Shiki`](https://shiki.matsu.io/)

我们需要什么语言的染色，只需在 `nuxt.config.ts` 的 `content` 配置即可：

```js
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      preload: [
        'javascript',
        'typescript',
        'vue',
        'vue-html'.
        //....
      ],
    },
  },
})
```

然后在 `markdown` 里使用对应的代码块即可: ` ```[lang]\n{content}\n``` `

## 黑暗模式 

现代额 `modern web` 应用，没有黑暗模式怎么行？ 笔者之前写过一篇基于 `css-var` 的动态切换主题文章: [动态调整web系统主题? 看这一篇就够了](https://juejin.cn/post/7043359491382837255)。

当然在 `nuxt3` 中有现成的解决方案，并不需要我们自己去实现，不过相应的代价也不够自定义，开始安装：

```bash
yarn add -D @nuxtjs/color-mode
```

注册 `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content','@nuxtjs/color-mode'],
})
```

这样我们就可以直接使用 `useColorMode` 和 `vue` 组件实例中的 `$colorMode` 了:

![Image](https://pic4.zhimg.com/80/v2-58608fe75891745f3e2567ef6bb0cc89.png)

同时我们通过对 `colorMode.preference` 进行修改，即可更改 `html` 元素上的属性

![Image](https://pic4.zhimg.com/80/v2-c7ec22bb2ef45f6cad06d6756f9f7819.png)

通过上图我们可以发现，在模式切换时，`html` 上的 `class` 会在 `dark-mode`/`light-mode`或者其他的 `xx-mode` 之间切换(可自定义)。

通过此规律，我们就可以来自定义配置 `tailwind.config.js` 的黑暗模式的选择器了:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode 默认值为 media，即媒体查询适配
  // 现在被我改为了 class 选择器策略，同时修改了选择器为 .dark-mode (见第二个参数)
  darkMode: ['class', '.dark-mode'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```

配置好后我们马上来试试吧！

`app.vue`:
```html
<template>
  <main>
    <div>
      <h1 class="dark:text-white">Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <ContentDoc class="prose dark:prose-invert" />
  </main>
</template>
<script setup lang="ts"></script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply dark:bg-black;
}
</style>
```

实时切换效果如下:


![light mode](https://pic4.zhimg.com/80/v2-875bffdcfe642e48f0eff1b992c05094.png)

![dark mode](https://pic4.zhimg.com/80/v2-c4fbf85c5a690482847dacc18bdacd51.png)

## 展示效果

文章写到这里，接下来，让我们来简单添加一些样式，来看看本篇文章，在我们的博客应用中的展现效果吧！

![展示效果](https://pic4.zhimg.com/80/v2-b3a368b0f1fde31bc2489711419f0eae.png)

有了内容之后，接下来我们围绕自己的文章，就可以建立一套管理机制，来管理我们的博客应用了！

接下来，即将进入 `Nuxt3` 约定式路由！

## 附录

[源码](https://github.com/sonofmagic/icebreaker.top)

[tailwindcss/dark-mode](https://tailwindcss.com/docs/dark-mode)

[prose-invert](https://tailwindcss.com/docs/typography-plugin#adapting-to-dark-mode)

[@nuxtjs/color-mode](https://color-mode.nuxtjs.org/)