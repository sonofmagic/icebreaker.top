import Vue from 'vue'

import * as filters from '@/filters/global.js'
import '@/assets/icon/font-awesome.js'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// if (process.client) {
//   /**
//    * write some client code here
//    */
// }
