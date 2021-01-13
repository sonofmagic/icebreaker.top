# 记录一些经验教训

## esmServerMid

原先的想法，是使用 `esm + rollup => cjs` 的思路来写 `serverMiddleware`

后来遇到了一个问题，`nuxt` 的 `server side plugin` 需要和 `serverMiddleware` 引用同一个单例对象

但是 `serverMiddleware` 里面的经过了 `rollup` 打包,而 `server side plugin`没有

这就导致了，本可以复用的对象，初始化了两次

### 解决思路

1. `rollup` 多加一个 `input` ，把 `server side plugin` 和 `serverMiddleware` 一起打包
2. 全部都改写成 `cjs`

::第一种方案，即使实现了，也很复杂

[x] 采用的方案2

### 文件夹里存放的当时写的 esm
