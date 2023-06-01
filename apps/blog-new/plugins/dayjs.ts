import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export default defineNuxtPlugin(nuxtApp => {
  dayjs.locale('zh-cn')
  dayjs.extend(relativeTime)
  dayjs.extend(utc)
})
