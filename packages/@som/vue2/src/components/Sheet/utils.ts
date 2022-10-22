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
