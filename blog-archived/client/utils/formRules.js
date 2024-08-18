import { passwordPattern } from './validate'
export const passwordRule = [
  {
    required: true,
    whitespace: true,
    message: '请填写您的密码',
  },
  {
    min: 8,
    message: '密码至少8个字符',
  },
  {
    max: 32,
    message: '密码不能超过32个字符',
  },
  {
    validator(rule, value, callback) {
      if (/\s/.test(value)) {
        callback(new Error('不能含有空格'))
      } else {
        callback()
      }
    },
  },
  {
    pattern: passwordPattern,
    message: '至少包含一个字母和数字',
  },
]
