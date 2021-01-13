# 此文件夹放的是google，baidu,好搜统计等相关的植入代码

## 最佳实践

例如百度，直接在:
> 管理 > 代码管理 > 代码获取

直接复制粘贴进来变成一个js就行,列入 `google.js`,`baidu.js`,`haosou.js` ...

然后在 `nuxt.config.js` > `head` > `__dangerouslyDisableSanitizersByTagID`
配置hid , 把内容写进script innerHTML

```js
import fs from 'fs'
const isProd = process.env.NODE_ENV === 'production'
const script = isProd ? [{
  hid: 'hm',
  innerHTML: fs.readFileSync('./statistics/baidu.js', {
    encoding: 'utf-8',
  }),
}]:[]

const head = {
  script,
  __dangerouslyDisableSanitizersByTagID: {
    hm: ['innerHTML']
  },
}
```

参考: [vue-meta/API/__dangerouslyDisableSanitizersByTagID](https://vue-meta.nuxtjs.org/api/#dangerouslydisablesanitizersbytagid)

> 注意 `vue-meta` 文档里用的列子是 `vmid` , `nuxt` 里默认是 `hid`
> `hid/vmid` 相当重要，比如 一个page的title要覆盖全局的title, 全局配置的hid就必须和page的title的相同，只有这样page里属性的才能覆盖全局，否则会出现多个title标签,description/keywords 同理

## 之前尝试过的几种方案，在使用的时候或多或少有些缺陷

layout的生存周期里添加统计代码，仅供参考

```js
/**
 *
 * @param {String} key
 * @param {String|Function} src
 */
function createNoRepeatScriptElement (key, src) {
  return (dom) => {
    const s = dom || document.getElementsByTagName('script')[0]
    const parentNode = s.parentNode
    if (parentNode.getElementsByClassName(key).length === 0) {
      const hm = document.createElement('script')
      hm.className = key
      if (typeof src === 'function') {
        src(hm)
      } else {
        hm.src = src
      }
      parentNode.insertBefore(hm, s)
    }
  }
}

let singleCalled = false
function init () {
  if (singleCalled) {
    return
  }
  const cacheDom = document.getElementsByTagName('script')[0]

  if (process.env.envConfig === 'prod') {
    createNoRepeatScriptElement('bp', (dom) => {
      const curProtocol = window.location.protocol.split(':')[0]
      if (curProtocol === 'https') {
        dom.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      } else {
        dom.src = 'http://push.zhanzhang.baidu.com/push.js'
      }
    })(cacheDom)

    createNoRepeatScriptElement('sozz', (dom) => {
      dom.src =
        'https://jspassport.ssl.qhimg.com/11.0.1.js'
      dom.id = 'sozz'
    })(cacheDom)
  }

  singleCalled = true
}

export default init
```
