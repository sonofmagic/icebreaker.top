import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Grid,
  GridItem,
  Icon,
  Image,
  Loading,
  NoticeBar,
  Popup,
  Tag,
  Toast,
  Uploader,
} from 'vant'
import Vue from 'vue'

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
  Image,
  Loading,
]

coms.forEach((com) => {
  Vue.use(com)
})
