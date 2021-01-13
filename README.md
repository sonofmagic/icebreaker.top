# sonofmagic.github.io

> icebreaker 的 Serverless Blog 搭建过程

## 简介

 本栈用 nuxt + serverless 和配套的服务 ，低成本的搭建一套包含seo，page cache，markdown自动生成功能，同时也会写一些搭建心得，主要包含vue,nuxt,nodejs,小程序相关的一些心得和体会

## 项目目录

现在采用lerna分包的机制，先本地包，然后私有包，接着npm

**packages**里面是所有的包

- `packages/@nuxtjs` : 写着玩的 just for fun
- `packages/@som` : 项目
  - `blog` : website `icebreaker.top` source code
    - `.env` : 运行时环境变量,内容可参考同目录下 `.env.example`
    - `scripts` : 包含部署serverless和cdn等脚本
    - `scripts/customDomains.js` : api网关解析的自定义域名 `customDomains.example.js`
    - `client` : nuxt 项目源码
    - `server` : esm sls require entry
    - `dist` : `server` rollup 打包后的 cjs包,用于 sls.js require 和 debug
    - `content`: 用于显示的文章, 建议放入Github私有仓库，建立软连接运行，小心爬虫，隔墙有耳！

  - 其他 分割原项目依赖
- `packages/history-version`
  - `wwwroot` : spa项目 `build` 打入 `webapi`
  - `webapi` : use `history-api-fallback` **host** `wwwroot/dist/index.html` 其他上 **cdn**

## 怎么跑

```sh

npm i
# or
yarn
# then
lerna bootstrap
# then
lerna run dev
# or 
cd packages/@som/blog && yarn dev

```

部署要先global安装serverless

```sh

npm i -g serverless
# or
yarn global add serverless

```

## Serverless Framework

用的是腾讯云的哟
文档最新最详细的都在

<https://github.com/serverless-components>

部署注册个腾讯云账号，加加配置进来当环境变量就行

由于本人是薅羊毛大师，整套站一个月成本在x分钱左右

**Cloudbase** 免费额度

- 云储存 5G
- 云数据库 2G
- 云函数 4万GBs
- 静态网站托管 1G | cdn 5G/一个月

**Serverless** 免费额度

- 资源使用量  40万GBs
- 调用次数 100万次

**内容分发网络cdn** 免费额度

- 10G/一个月

**对象存储COS**

- 我的免费额度过期了，每个月要从这里面扣几分钱

**文件存储CFS**

CFS我理解成一块随时挂载的硬盘

在Serverless场景下，由于无状态，写内存没啥用，

`/tmp` 文件夹下的临时文件也不确定

需要 `redis` 这种来保持状态

买 `redis` 太贵，自己有云服务器，可以去 `docker hub` 上拉 `redis` 镜像部署

本人直接云函数挂载 CFS ,实现一套文件缓存

## 关于作者

某二线城市，忙忙碌碌无为的创业青年

### 欢迎各方的技术人一同交流

- Email: 1324318532@qq.com
- QQ: 同上
- Wechat: SonOfMagic
