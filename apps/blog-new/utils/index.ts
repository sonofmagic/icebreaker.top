import dayjs from 'dayjs'

export function fromNowFilter(v: string) {
  if (!v) {
    return v
  }
  return dayjs(v).local().fromNow()
}
