
const {
  generateMsgLink
} = require('./util')
const {
  UserAction
} = require('./action')
const tcb = require('./tcb')
module.exports = {
  UserSubscribe: {
    Welcome: ['Hello，欢迎关注 icebreaker',
      '本人是一个Serverless爱好者',
      '本订阅号由Serverless + CFS打造',
      generateMsgLink('www.icebreaker.top', '我的博客'),
      generateMsgLink('https://github.com/sonofmagic/sonofmagic.github.io/tree/dev/packages/icebreaker99', '项目地址(Github)')
    ].join('\n'),
    List: [
      UserAction.Music,
      UserAction.Joke,
      UserAction.Author
    ].join('\n'),
    Author: '微信: SonOfMagic',
    Joke: '从前有个太监，下面没有了',
    Music: async () => {
      const {
        fileList
      } = await tcb.getTempFileURL({
        fileList: ['cloud://mp-129627.6d70-mp-129627-1257725330/music/喜欢寂寞-苏打绿.m4a']
      })
      // console.log(fileList)
      return {
        type: 'music',
        content: {
          title: '喜欢寂寞',
          description: '苏打绿',
          musicUrl: fileList[0].tempFileURL
        }
      }
    }
  },
  AdminSubscribe: {

  }
}
