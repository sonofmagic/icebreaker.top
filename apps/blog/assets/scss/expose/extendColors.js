function withOpacityValue (variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  colors: {
    'color-fg-default': --color-fg-default,
    'color-fg-muted': --color-fg-muted,
    'color-fg-subtle': --color-fg-subtle,
    'color-fg-on-emphasis': --color-fg-on-emphasis,
    'color-fg-brand': --color-fg-brand,
    'color-fg-accent': --color-fg-accent,
    'color-fg-success': --color-fg-success,
    'color-fg-attention': --color-fg-attention,
    'color-fg-danger': --color-fg-danger,
    'color-bg-default': --color-bg-default,
    'color-bg-subtle': --color-bg-subtle,
    'color-bg-inset': --color-bg-inset,
    'color-bg-emphasis': --color-bg-emphasis,
    'color-bg-accent': --color-bg-accent,
    'color-bg-success': --color-bg-success,
    'color-bg-attention': --color-bg-attention,
    'color-bg-danger': --color-bg-danger,
    'color-border-default': --color-border-default,
    'color-border-muted': --color-border-muted,
    'color-border-strong': --color-border-strong,
    'color-border-accent': --color-border-accent,
    'color-border-success': --color-border-success,
    'color-border-attention': --color-border-attention,
    'color-border-danger': --color-border-danger,
    'wombat-red-hover': --wombat-red-hover,
    'button-green': --button-green,
    'wombat-yellow': --wombat-yellow,
    'wombat-violet': --wombat-violet,
    'wombat-purple': --wombat-purple,
    'wombat-green': --wombat-green,
    'wombat-teal': --wombat-teal,
    'light-blue': --light-blue,
    'wombat-red': --wombat-red,
    'header-color': --header-color,
    'bg-dark': --bg-dark,
    'npmRed': --npmRed,
    'npmLightRed': --npmLightRed,
    'blue': --blue,
    'bg': --bg,
    'background-color': --background-color,
    'wombat-bg-red': --wombat-bg-red,
    'copy-color': --copy-color,
    'code-bg': --code-bg,
  }
}
