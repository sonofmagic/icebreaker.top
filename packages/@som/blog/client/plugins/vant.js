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
  Image,
  Loading,
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
  Image,
  Loading,
]

coms.forEach((com) => {
  Vue.use(com)
})
