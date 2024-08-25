/* eslint-disable node/prefer-global/process */

import { Toast } from 'vant'

let copy
if (process.browser) {
  copy = require('copy-text-to-clipboard').default
}

export default {
  methods: {
    copyText(text) {
      copy(text)
      Toast.success('复制成功!')
    },
  },
}
