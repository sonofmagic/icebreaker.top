function getXDirect (offset: number) {
  if (offset > 0) {
    return '→'
  } else if (offset < 0) {
    return '←'
  }
  return '·'
}

function getYDirect (offset: number) {
  if (offset > 0) {
    return '↓'
  } else if (offset < 0) {
    return '↑'
  }
  return '·'
}

export function getDirection ([offsetX, offsetY]: [number, number]) {
  return [getXDirect(offsetX), getYDirect(offsetY)]
}

export function getBoundingClientRect (el: HTMLElement | EventTarget | null | undefined): DOMRect {
  if (el) {
    const rect = (<HTMLElement>el).getBoundingClientRect()
    return rect
  }
  return {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON () {
      return ''
    }
  }
}
