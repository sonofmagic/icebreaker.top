const errorMapper = {
  AUTH_INVALID_CUSTOM_LOGIN_TICKET: '自定义登录凭证非法',
  AUTH_WX_OAUTH_FAILED: '微信 OAuth 失败',
  AUTH_CUSTOM_USER_ID_HAS_BEEN_BOUND: 'CustomUserId 已关联帐户',
  AUTH_OPEN_ID_HAS_BEEN_BOUND: 'openId 已关联帐户',
  AUTH_UNION_ID_HAS_BEEN_BOUND: 'unionId 已关联帐户',
  AUTH_EMAIL_HAS_BEEN_BOUND: '该邮箱已注册,请更换邮箱',
  INVALID_EMAIL_TOKEN: '邮箱激活 token 过期或者不存在',
  AUTH_LOGIN_FAILED: '登录失败,邮箱/用户名或者密码不正确',
  INVALID_PARAM: '用户名/邮箱或密码错误',
}

export default function handler(error) {
  const { msg } = JSON.parse(error.message)
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-useless-escape
  const internalCode = /\[([^\[\]]+)\]/.exec(msg)[1]
  error.code = internalCode
  error.msg = errorMapper[internalCode] || '系统错误'
  throw error
}
