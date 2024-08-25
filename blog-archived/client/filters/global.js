import dayjs from 'dayjs'

export function dayFilter(value, format) {
  const template = format || 'YYYY-MM-DD'
  return dayjs(value).format(template)
}

const now = dayjs()

export function timespanFilter(value) {
  const p = dayjs(value)
  const t = now.diff(p, 'd')
  switch (true) {
    case t === 0: {
      return 'Today'
    }
    case t < 31: {
      return `${t} days ago`
    }
    case t < 366: {
      return `${Math.floor(t / 30)} months ago`
    }
    case typeof t === 'number': {
      return `${Math.floor(t / 365)} years ago`
    }
    default: {
      return p.format('YYYY-MM-DD')
    }
  }
}
