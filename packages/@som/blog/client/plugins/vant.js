import Vue from 'vue'
import {
  Popup,
  Dialog,
  Toast,
  Cell,
  CellGroup,
  Tag,
  NoticeBar,
  Icon,
  Uploader,
  Button,
  Grid,
  GridItem,
} from 'vant'

const coms = [
  Popup,
  Dialog,
  Toast,
  Cell,
  CellGroup,
  Tag,
  NoticeBar,
  Icon,
  Uploader,
  Button,
  Grid,
  GridItem,
]

coms.forEach((com) => {
  Vue.use(com)
})
