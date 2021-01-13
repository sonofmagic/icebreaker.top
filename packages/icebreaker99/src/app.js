// const api = require('./api')
// const cache = require('./cache')
// async function main () {
//   const result = await api.getMenu()
//   console.log(result)
// }
// main()
const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const wechat = require('co-wechat')
const {
  UserSubscribe
} = require('./msg')
const API = require('./api')
const {
  appid,
  token,
  encodingAESKey,
  admin
} = require('./wechatConfig')
const cfg = {
  appid,
  token,
  encodingAESKey
}
const {
  UserAction
} = require('./action')
app.use(router.routes()).use(router.allowedMethods())

app.use(wechat(cfg).middleware(async (message, ctx) => {
  console.log(message)
  // 微信输入信息就是这个 message
  const {
    MsgId,
    Content,
    MsgType,
    CreateTime,
    FromUserName,
    SendLocationInfo,
    SendPicsInfo
  } = message
  // 管理员功能
  if (admin.includes(FromUserName)) {
    if (MsgType === 'event') {
      if (message.Event === 'subscribe') {
        // if (message.EventKey) {
        //   console.log('扫描二维码进入...')
        // }
        return '你好,伟大的主人'
      } else if (message.Event === 'unsubscribe') {
        // 取消关注
        return '主人再见'
      }
    } else if (message.MsgType === 'text') {
      switch (Content) {
        case 'h':
        case 'help': {
          return ['获取菜单', '重构菜单']
        }
        case 'ls':
        case 'list': {
          return ['输入了ls']
        }
        case '获取菜单': {
          const res = await API.getMenu()
          console.log(res)
          return '获取成功'
        }
        case '重构菜单': {
          const result = await API.createMenu(require('./menu'))
          return JSON.stringify(result) // '重构成功'
        }
        default: {
          return '不知道'
        }
      }
    }
  } else {
    // 普通关注用户
    if (MsgType === 'event') {
      if (message.Event === 'subscribe') {
        if (message.EventKey) {
          console.log('扫描二维码进入...')
        }
        return UserSubscribe.Welcome
      } else if (message.Event === 'unsubscribe') {
        // 取消关注
        return '再见'
      }
    } else if (message.MsgType === 'text') {
      switch (Content) {
        case '列表': {
          return Object.values(UserAction).join('\n')
        }
        case UserAction.Joke: {
          return UserSubscribe.Joke
        }
        case UserAction.Music: {
          return await UserSubscribe.Music()
        }
        case UserAction.Author: {
          return '微信: SonOfMagic'
        }
        default: {
          return '不知道'
        }
      }
    }
  }
}))

process.on('uncaughtException', (err) => {
  console.log(err)
})
module.exports = app
