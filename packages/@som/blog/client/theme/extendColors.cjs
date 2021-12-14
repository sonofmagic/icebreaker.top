function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  colors: {
    'header-text': withOpacityValue('--color-header-text'),
    'header-bg': withOpacityValue('--color-header-bg'),
    'canvas-default': withOpacityValue('--color-canvas-default'),
    'canvas-inset': withOpacityValue('--color-canvas-inset'),
    'fg-default': withOpacityValue('--color-fg-default'),
  },
}
