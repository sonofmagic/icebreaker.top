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
    'canvas-default-transparent': withOpacityValue(
      '--color-canvas-default-transparent'
    ),
    'marketing-icon-primary': withOpacityValue(
      '--color-marketing-icon-primary'
    ),
    'marketing-icon-secondary': withOpacityValue(
      '--color-marketing-icon-secondary'
    ),
    'diff-blob-addition-num-text': withOpacityValue(
      '--color-diff-blob-addition-num-text'
    ),
    'diff-blob-addition-fg': withOpacityValue('--color-diff-blob-addition-fg'),
    'diff-blob-addition-num-bg': withOpacityValue(
      '--color-diff-blob-addition-num-bg'
    ),
    'diff-blob-addition-line-bg': withOpacityValue(
      '--color-diff-blob-addition-line-bg'
    ),
    'diff-blob-addition-word-bg': withOpacityValue(
      '--color-diff-blob-addition-word-bg'
    ),
    'diff-blob-deletion-num-text': withOpacityValue(
      '--color-diff-blob-deletion-num-text'
    ),
    'diff-blob-deletion-fg': withOpacityValue('--color-diff-blob-deletion-fg'),
    'diff-blob-deletion-num-bg': withOpacityValue(
      '--color-diff-blob-deletion-num-bg'
    ),
    'diff-blob-deletion-line-bg': withOpacityValue(
      '--color-diff-blob-deletion-line-bg'
    ),
    'diff-blob-deletion-word-bg': withOpacityValue(
      '--color-diff-blob-deletion-word-bg'
    ),
    'diff-blob-hunk-num-bg': withOpacityValue('--color-diff-blob-hunk-num-bg'),
    'diff-blob-expander-icon': withOpacityValue(
      '--color-diff-blob-expander-icon'
    ),
    'diff-blob-selected-line-highlight-mix-blend-mode': withOpacityValue(
      '--color-diff-blob-selected-line-highlight-mix-blend-mode'
    ),
    'diffstat-deletion-border': withOpacityValue(
      '--color-diffstat-deletion-border'
    ),
    'diffstat-addition-border': withOpacityValue(
      '--color-diffstat-addition-border'
    ),
    'diffstat-addition-bg': withOpacityValue('--color-diffstat-addition-bg'),
    'search-keyword-hl': withOpacityValue('--color-search-keyword-hl'),
    'prettylights-syntax-comment': withOpacityValue(
      '--color-prettylights-syntax-comment'
    ),
    'prettylights-syntax-constant': withOpacityValue(
      '--color-prettylights-syntax-constant'
    ),
    'prettylights-syntax-entity': withOpacityValue(
      '--color-prettylights-syntax-entity'
    ),
    'prettylights-syntax-storage-modifier-import': withOpacityValue(
      '--color-prettylights-syntax-storage-modifier-import'
    ),
    'prettylights-syntax-entity-tag': withOpacityValue(
      '--color-prettylights-syntax-entity-tag'
    ),
    'prettylights-syntax-keyword': withOpacityValue(
      '--color-prettylights-syntax-keyword'
    ),
    'prettylights-syntax-string': withOpacityValue(
      '--color-prettylights-syntax-string'
    ),
    'prettylights-syntax-variable': withOpacityValue(
      '--color-prettylights-syntax-variable'
    ),
    'prettylights-syntax-brackethighlighter-unmatched': withOpacityValue(
      '--color-prettylights-syntax-brackethighlighter-unmatched'
    ),
    'prettylights-syntax-invalid-illegal-text': withOpacityValue(
      '--color-prettylights-syntax-invalid-illegal-text'
    ),
    'prettylights-syntax-invalid-illegal-bg': withOpacityValue(
      '--color-prettylights-syntax-invalid-illegal-bg'
    ),
    'prettylights-syntax-carriage-return-text': withOpacityValue(
      '--color-prettylights-syntax-carriage-return-text'
    ),
    'prettylights-syntax-carriage-return-bg': withOpacityValue(
      '--color-prettylights-syntax-carriage-return-bg'
    ),
    'prettylights-syntax-string-regexp': withOpacityValue(
      '--color-prettylights-syntax-string-regexp'
    ),
    'prettylights-syntax-markup-list': withOpacityValue(
      '--color-prettylights-syntax-markup-list'
    ),
    'prettylights-syntax-markup-heading': withOpacityValue(
      '--color-prettylights-syntax-markup-heading'
    ),
    'prettylights-syntax-markup-italic': withOpacityValue(
      '--color-prettylights-syntax-markup-italic'
    ),
    'prettylights-syntax-markup-bold': withOpacityValue(
      '--color-prettylights-syntax-markup-bold'
    ),
    'prettylights-syntax-markup-deleted-text': withOpacityValue(
      '--color-prettylights-syntax-markup-deleted-text'
    ),
    'prettylights-syntax-markup-deleted-bg': withOpacityValue(
      '--color-prettylights-syntax-markup-deleted-bg'
    ),
    'prettylights-syntax-markup-inserted-text': withOpacityValue(
      '--color-prettylights-syntax-markup-inserted-text'
    ),
    'prettylights-syntax-markup-inserted-bg': withOpacityValue(
      '--color-prettylights-syntax-markup-inserted-bg'
    ),
    'prettylights-syntax-markup-changed-text': withOpacityValue(
      '--color-prettylights-syntax-markup-changed-text'
    ),
    'prettylights-syntax-markup-changed-bg': withOpacityValue(
      '--color-prettylights-syntax-markup-changed-bg'
    ),
    'prettylights-syntax-markup-ignored-text': withOpacityValue(
      '--color-prettylights-syntax-markup-ignored-text'
    ),
    'prettylights-syntax-markup-ignored-bg': withOpacityValue(
      '--color-prettylights-syntax-markup-ignored-bg'
    ),
    'prettylights-syntax-meta-diff-range': withOpacityValue(
      '--color-prettylights-syntax-meta-diff-range'
    ),
    'prettylights-syntax-brackethighlighter-angle': withOpacityValue(
      '--color-prettylights-syntax-brackethighlighter-angle'
    ),
    'prettylights-syntax-sublimelinter-gutter-mark': withOpacityValue(
      '--color-prettylights-syntax-sublimelinter-gutter-mark'
    ),
    'prettylights-syntax-constant-other-reference-link': withOpacityValue(
      '--color-prettylights-syntax-constant-other-reference-link'
    ),
    'codemirror-text': withOpacityValue('--color-codemirror-text'),
    'codemirror-bg': withOpacityValue('--color-codemirror-bg'),
    'codemirror-gutters-bg': withOpacityValue('--color-codemirror-gutters-bg'),
    'codemirror-guttermarker-text': withOpacityValue(
      '--color-codemirror-guttermarker-text'
    ),
    'codemirror-guttermarker-subtle-text': withOpacityValue(
      '--color-codemirror-guttermarker-subtle-text'
    ),
    'codemirror-linenumber-text': withOpacityValue(
      '--color-codemirror-linenumber-text'
    ),
    'codemirror-cursor': withOpacityValue('--color-codemirror-cursor'),
    'codemirror-selection-bg': withOpacityValue(
      '--color-codemirror-selection-bg'
    ),
    'codemirror-activeline-bg': withOpacityValue(
      '--color-codemirror-activeline-bg'
    ),
    'codemirror-matchingbracket-text': withOpacityValue(
      '--color-codemirror-matchingbracket-text'
    ),
    'codemirror-lines-bg': withOpacityValue('--color-codemirror-lines-bg'),
    'codemirror-syntax-comment': withOpacityValue(
      '--color-codemirror-syntax-comment'
    ),
    'codemirror-syntax-constant': withOpacityValue(
      '--color-codemirror-syntax-constant'
    ),
    'codemirror-syntax-entity': withOpacityValue(
      '--color-codemirror-syntax-entity'
    ),
    'codemirror-syntax-keyword': withOpacityValue(
      '--color-codemirror-syntax-keyword'
    ),
    'codemirror-syntax-storage': withOpacityValue(
      '--color-codemirror-syntax-storage'
    ),
    'codemirror-syntax-string': withOpacityValue(
      '--color-codemirror-syntax-string'
    ),
    'codemirror-syntax-support': withOpacityValue(
      '--color-codemirror-syntax-support'
    ),
    'codemirror-syntax-variable': withOpacityValue(
      '--color-codemirror-syntax-variable'
    ),
    'checks-bg': withOpacityValue('--color-checks-bg'),
    'checks-run-border-width': withOpacityValue(
      '--color-checks-run-border-width'
    ),
    'checks-container-border-width': withOpacityValue(
      '--color-checks-container-border-width'
    ),
    'checks-text-primary': withOpacityValue('--color-checks-text-primary'),
    'checks-text-secondary': withOpacityValue('--color-checks-text-secondary'),
    'checks-text-link': withOpacityValue('--color-checks-text-link'),
    'checks-btn-icon': withOpacityValue('--color-checks-btn-icon'),
    'checks-btn-hover-icon': withOpacityValue('--color-checks-btn-hover-icon'),
    'checks-btn-hover-bg': withOpacityValue('--color-checks-btn-hover-bg'),
    'checks-input-text': withOpacityValue('--color-checks-input-text'),
    'checks-input-placeholder-text': withOpacityValue(
      '--color-checks-input-placeholder-text'
    ),
    'checks-input-focus-text': withOpacityValue(
      '--color-checks-input-focus-text'
    ),
    'checks-input-bg': withOpacityValue('--color-checks-input-bg'),
    'checks-donut-error': withOpacityValue('--color-checks-donut-error'),
    'checks-donut-pending': withOpacityValue('--color-checks-donut-pending'),
    'checks-donut-success': withOpacityValue('--color-checks-donut-success'),
    'checks-donut-neutral': withOpacityValue('--color-checks-donut-neutral'),
    'checks-dropdown-text': withOpacityValue('--color-checks-dropdown-text'),
    'checks-dropdown-bg': withOpacityValue('--color-checks-dropdown-bg'),
    'checks-dropdown-border': withOpacityValue(
      '--color-checks-dropdown-border'
    ),
    'checks-dropdown-shadow': '--color-checks-dropdown-shadow',
    'checks-dropdown-hover-text': withOpacityValue(
      '--color-checks-dropdown-hover-text'
    ),
    'checks-dropdown-hover-bg': withOpacityValue(
      '--color-checks-dropdown-hover-bg'
    ),
    'checks-dropdown-btn-hover-text': withOpacityValue(
      '--color-checks-dropdown-btn-hover-text'
    ),
    'checks-dropdown-btn-hover-bg': withOpacityValue(
      '--color-checks-dropdown-btn-hover-bg'
    ),
    'checks-scrollbar-thumb-bg': withOpacityValue(
      '--color-checks-scrollbar-thumb-bg'
    ),
    'checks-header-label-text': withOpacityValue(
      '--color-checks-header-label-text'
    ),
    'checks-header-label-open-text': withOpacityValue(
      '--color-checks-header-label-open-text'
    ),
    'checks-header-border': withOpacityValue('--color-checks-header-border'),
    'checks-header-icon': withOpacityValue('--color-checks-header-icon'),
    'checks-line-text': withOpacityValue('--color-checks-line-text'),
    'checks-line-num-text': withOpacityValue('--color-checks-line-num-text'),
    'checks-line-timestamp-text': withOpacityValue(
      '--color-checks-line-timestamp-text'
    ),
    'checks-line-hover-bg': withOpacityValue('--color-checks-line-hover-bg'),
    'checks-line-selected-bg': withOpacityValue(
      '--color-checks-line-selected-bg'
    ),
    'checks-line-selected-num-text': withOpacityValue(
      '--color-checks-line-selected-num-text'
    ),
    'checks-line-dt-fm-text': withOpacityValue(
      '--color-checks-line-dt-fm-text'
    ),
    'checks-line-dt-fm-bg': withOpacityValue('--color-checks-line-dt-fm-bg'),
    'checks-gate-bg': withOpacityValue('--color-checks-gate-bg'),
    'checks-gate-text': withOpacityValue('--color-checks-gate-text'),
    'checks-gate-waiting-text': withOpacityValue(
      '--color-checks-gate-waiting-text'
    ),
    'checks-step-header-open-bg': withOpacityValue(
      '--color-checks-step-header-open-bg'
    ),
    'checks-step-error-text': withOpacityValue(
      '--color-checks-step-error-text'
    ),
    'checks-step-warning-text': withOpacityValue(
      '--color-checks-step-warning-text'
    ),
    'checks-logline-text': withOpacityValue('--color-checks-logline-text'),
    'checks-logline-num-text': withOpacityValue(
      '--color-checks-logline-num-text'
    ),
    'checks-logline-debug-text': withOpacityValue(
      '--color-checks-logline-debug-text'
    ),
    'checks-logline-error-text': withOpacityValue(
      '--color-checks-logline-error-text'
    ),
    'checks-logline-error-num-text': withOpacityValue(
      '--color-checks-logline-error-num-text'
    ),
    'checks-logline-error-bg': withOpacityValue(
      '--color-checks-logline-error-bg'
    ),
    'checks-logline-warning-text': withOpacityValue(
      '--color-checks-logline-warning-text'
    ),
    'checks-logline-warning-num-text': withOpacityValue(
      '--color-checks-logline-warning-num-text'
    ),
    'checks-logline-warning-bg': withOpacityValue(
      '--color-checks-logline-warning-bg'
    ),
    'checks-logline-command-text': withOpacityValue(
      '--color-checks-logline-command-text'
    ),
    'checks-logline-section-text': withOpacityValue(
      '--color-checks-logline-section-text'
    ),
    'checks-ansi-black': withOpacityValue('--color-checks-ansi-black'),
    'checks-ansi-black-bright': withOpacityValue(
      '--color-checks-ansi-black-bright'
    ),
    'checks-ansi-white': withOpacityValue('--color-checks-ansi-white'),
    'checks-ansi-white-bright': withOpacityValue(
      '--color-checks-ansi-white-bright'
    ),
    'checks-ansi-gray': withOpacityValue('--color-checks-ansi-gray'),
    'checks-ansi-red': withOpacityValue('--color-checks-ansi-red'),
    'checks-ansi-red-bright': withOpacityValue(
      '--color-checks-ansi-red-bright'
    ),
    'checks-ansi-green': withOpacityValue('--color-checks-ansi-green'),
    'checks-ansi-green-bright': withOpacityValue(
      '--color-checks-ansi-green-bright'
    ),
    'checks-ansi-yellow': withOpacityValue('--color-checks-ansi-yellow'),
    'checks-ansi-yellow-bright': withOpacityValue(
      '--color-checks-ansi-yellow-bright'
    ),
    'checks-ansi-blue': withOpacityValue('--color-checks-ansi-blue'),
    'checks-ansi-blue-bright': withOpacityValue(
      '--color-checks-ansi-blue-bright'
    ),
    'checks-ansi-magenta': withOpacityValue('--color-checks-ansi-magenta'),
    'checks-ansi-magenta-bright': withOpacityValue(
      '--color-checks-ansi-magenta-bright'
    ),
    'checks-ansi-cyan': withOpacityValue('--color-checks-ansi-cyan'),
    'checks-ansi-cyan-bright': withOpacityValue(
      '--color-checks-ansi-cyan-bright'
    ),
    'project-header-bg': withOpacityValue('--color-project-header-bg'),
    'project-sidebar-bg': withOpacityValue('--color-project-sidebar-bg'),
    'project-gradient-in': withOpacityValue('--color-project-gradient-in'),
    'project-gradient-out': withOpacityValue('--color-project-gradient-out'),
    'mktg-btn-bg': withOpacityValue('--color-mktg-btn-bg'),
    'mktg-btn-shadow-outline': '--color-mktg-btn-shadow-outline',
    'mktg-btn-shadow-focus': '--color-mktg-btn-shadow-focus',
    'mktg-btn-shadow-hover': '--color-mktg-btn-shadow-hover',
    'mktg-btn-shadow-hover-muted': '--color-mktg-btn-shadow-hover-muted',
    'avatar-bg': withOpacityValue('--color-avatar-bg'),
    'avatar-border': withOpacityValue('--color-avatar-border'),
    'avatar-stack-fade': withOpacityValue('--color-avatar-stack-fade'),
    'avatar-stack-fade-more': withOpacityValue(
      '--color-avatar-stack-fade-more'
    ),
    'avatar-child-shadow': '--color-avatar-child-shadow',
    'topic-tag-border': withOpacityValue('--color-topic-tag-border'),
    'counter-border': withOpacityValue('--color-counter-border'),
    'select-menu-backdrop-border': withOpacityValue(
      '--color-select-menu-backdrop-border'
    ),
    'select-menu-tap-highlight': withOpacityValue(
      '--color-select-menu-tap-highlight'
    ),
    'select-menu-tap-focus-bg': withOpacityValue(
      '--color-select-menu-tap-focus-bg'
    ),
    'overlay-shadow': '--color-overlay-shadow',
    'header-text': withOpacityValue('--color-header-text'),
    'header-bg': withOpacityValue('--color-header-bg'),
    'header-divider': withOpacityValue('--color-header-divider'),
    'header-logo': withOpacityValue('--color-header-logo'),
    'header-search-bg': withOpacityValue('--color-header-search-bg'),
    'header-search-border': withOpacityValue('--color-header-search-border'),
    'sidenav-selected-bg': withOpacityValue('--color-sidenav-selected-bg'),
    'menu-bg-active': withOpacityValue('--color-menu-bg-active'),
    'input-disabled-bg': withOpacityValue('--color-input-disabled-bg'),
    'timeline-badge-bg': withOpacityValue('--color-timeline-badge-bg'),
    'ansi-black': withOpacityValue('--color-ansi-black'),
    'ansi-black-bright': withOpacityValue('--color-ansi-black-bright'),
    'ansi-white': withOpacityValue('--color-ansi-white'),
    'ansi-white-bright': withOpacityValue('--color-ansi-white-bright'),
    'ansi-gray': withOpacityValue('--color-ansi-gray'),
    'ansi-red': withOpacityValue('--color-ansi-red'),
    'ansi-red-bright': withOpacityValue('--color-ansi-red-bright'),
    'ansi-green': withOpacityValue('--color-ansi-green'),
    'ansi-green-bright': withOpacityValue('--color-ansi-green-bright'),
    'ansi-yellow': withOpacityValue('--color-ansi-yellow'),
    'ansi-yellow-bright': withOpacityValue('--color-ansi-yellow-bright'),
    'ansi-blue': withOpacityValue('--color-ansi-blue'),
    'ansi-blue-bright': withOpacityValue('--color-ansi-blue-bright'),
    'ansi-magenta': withOpacityValue('--color-ansi-magenta'),
    'ansi-magenta-bright': withOpacityValue('--color-ansi-magenta-bright'),
    'ansi-cyan': withOpacityValue('--color-ansi-cyan'),
    'ansi-cyan-bright': withOpacityValue('--color-ansi-cyan-bright'),
    'btn-text': withOpacityValue('--color-btn-text'),
    'btn-bg': withOpacityValue('--color-btn-bg'),
    'btn-border': withOpacityValue('--color-btn-border'),
    'btn-shadow': '--color-btn-shadow',
    'btn-inset-shadow': '--color-btn-inset-shadow',
    'btn-hover-bg': withOpacityValue('--color-btn-hover-bg'),
    'btn-hover-border': withOpacityValue('--color-btn-hover-border'),
    'btn-active-bg': withOpacityValue('--color-btn-active-bg'),
    'btn-active-border': withOpacityValue('--color-btn-active-border'),
    'btn-selected-bg': withOpacityValue('--color-btn-selected-bg'),
    'btn-focus-bg': withOpacityValue('--color-btn-focus-bg'),
    'btn-focus-border': withOpacityValue('--color-btn-focus-border'),
    'btn-focus-shadow': '--color-btn-focus-shadow',
    'btn-shadow-active': '--color-btn-shadow-active',
    'btn-shadow-input-focus': '--color-btn-shadow-input-focus',
    'btn-counter-bg': withOpacityValue('--color-btn-counter-bg'),
    'btn-primary-text': withOpacityValue('--color-btn-primary-text'),
    'btn-primary-bg': withOpacityValue('--color-btn-primary-bg'),
    'btn-primary-border': withOpacityValue('--color-btn-primary-border'),
    'btn-primary-shadow': '--color-btn-primary-shadow',
    'btn-primary-inset-shadow': '--color-btn-primary-inset-shadow',
    'btn-primary-hover-bg': withOpacityValue('--color-btn-primary-hover-bg'),
    'btn-primary-hover-border': withOpacityValue(
      '--color-btn-primary-hover-border'
    ),
    'btn-primary-selected-bg': withOpacityValue(
      '--color-btn-primary-selected-bg'
    ),
    'btn-primary-selected-shadow': '--color-btn-primary-selected-shadow',
    'btn-primary-disabled-text': withOpacityValue(
      '--color-btn-primary-disabled-text'
    ),
    'btn-primary-disabled-bg': withOpacityValue(
      '--color-btn-primary-disabled-bg'
    ),
    'btn-primary-disabled-border': withOpacityValue(
      '--color-btn-primary-disabled-border'
    ),
    'btn-primary-focus-bg': withOpacityValue('--color-btn-primary-focus-bg'),
    'btn-primary-focus-border': withOpacityValue(
      '--color-btn-primary-focus-border'
    ),
    'btn-primary-focus-shadow': '--color-btn-primary-focus-shadow',
    'btn-primary-icon': withOpacityValue('--color-btn-primary-icon'),
    'btn-primary-counter-bg': withOpacityValue(
      '--color-btn-primary-counter-bg'
    ),
    'btn-outline-text': withOpacityValue('--color-btn-outline-text'),
    'btn-outline-hover-text': withOpacityValue(
      '--color-btn-outline-hover-text'
    ),
    'btn-outline-hover-bg': withOpacityValue('--color-btn-outline-hover-bg'),
    'btn-outline-hover-border': withOpacityValue(
      '--color-btn-outline-hover-border'
    ),
    'btn-outline-hover-shadow': '--color-btn-outline-hover-shadow',
    'btn-outline-hover-inset-shadow': '--color-btn-outline-hover-inset-shadow',
    'btn-outline-hover-counter-bg': withOpacityValue(
      '--color-btn-outline-hover-counter-bg'
    ),
    'btn-outline-selected-text': withOpacityValue(
      '--color-btn-outline-selected-text'
    ),
    'btn-outline-selected-bg': withOpacityValue(
      '--color-btn-outline-selected-bg'
    ),
    'btn-outline-selected-border': withOpacityValue(
      '--color-btn-outline-selected-border'
    ),
    'btn-outline-selected-shadow': '--color-btn-outline-selected-shadow',
    'btn-outline-disabled-text': withOpacityValue(
      '--color-btn-outline-disabled-text'
    ),
    'btn-outline-disabled-bg': withOpacityValue(
      '--color-btn-outline-disabled-bg'
    ),
    'btn-outline-disabled-counter-bg': withOpacityValue(
      '--color-btn-outline-disabled-counter-bg'
    ),
    'btn-outline-focus-border': withOpacityValue(
      '--color-btn-outline-focus-border'
    ),
    'btn-outline-focus-shadow': '--color-btn-outline-focus-shadow',
    'btn-outline-counter-bg': withOpacityValue(
      '--color-btn-outline-counter-bg'
    ),
    'btn-danger-text': withOpacityValue('--color-btn-danger-text'),
    'btn-danger-hover-text': withOpacityValue('--color-btn-danger-hover-text'),
    'btn-danger-hover-bg': withOpacityValue('--color-btn-danger-hover-bg'),
    'btn-danger-hover-border': withOpacityValue(
      '--color-btn-danger-hover-border'
    ),
    'btn-danger-hover-shadow': '--color-btn-danger-hover-shadow',
    'btn-danger-hover-inset-shadow': '--color-btn-danger-hover-inset-shadow',
    'btn-danger-hover-icon': withOpacityValue('--color-btn-danger-hover-icon'),
    'btn-danger-hover-counter-bg': withOpacityValue(
      '--color-btn-danger-hover-counter-bg'
    ),
    'btn-danger-selected-text': withOpacityValue(
      '--color-btn-danger-selected-text'
    ),
    'btn-danger-selected-bg': withOpacityValue(
      '--color-btn-danger-selected-bg'
    ),
    'btn-danger-selected-border': withOpacityValue(
      '--color-btn-danger-selected-border'
    ),
    'btn-danger-selected-shadow': '--color-btn-danger-selected-shadow',
    'btn-danger-disabled-text': withOpacityValue(
      '--color-btn-danger-disabled-text'
    ),
    'btn-danger-disabled-bg': withOpacityValue(
      '--color-btn-danger-disabled-bg'
    ),
    'btn-danger-disabled-counter-bg': withOpacityValue(
      '--color-btn-danger-disabled-counter-bg'
    ),
    'btn-danger-focus-border': withOpacityValue(
      '--color-btn-danger-focus-border'
    ),
    'btn-danger-focus-shadow': '--color-btn-danger-focus-shadow',
    'btn-danger-counter-bg': withOpacityValue('--color-btn-danger-counter-bg'),
    'btn-danger-icon': withOpacityValue('--color-btn-danger-icon'),
    'underlinenav-icon': withOpacityValue('--color-underlinenav-icon'),
    'underlinenav-border-hover': withOpacityValue(
      '--color-underlinenav-border-hover'
    ),
    'action-list-item-inline-divider': withOpacityValue(
      '--color-action-list-item-inline-divider'
    ),
    'action-list-item-default-hover-bg': withOpacityValue(
      '--color-action-list-item-default-hover-bg'
    ),
    'action-list-item-default-active-bg': withOpacityValue(
      '--color-action-list-item-default-active-bg'
    ),
    'action-list-item-default-selected-bg': withOpacityValue(
      '--color-action-list-item-default-selected-bg'
    ),
    'action-list-item-danger-hover-bg': withOpacityValue(
      '--color-action-list-item-danger-hover-bg'
    ),
    'action-list-item-danger-active-bg': withOpacityValue(
      '--color-action-list-item-danger-active-bg'
    ),
    'action-list-item-danger-hover-text': withOpacityValue(
      '--color-action-list-item-danger-hover-text'
    ),
    'fg-default': withOpacityValue('--color-fg-default'),
    'fg-muted': withOpacityValue('--color-fg-muted'),
    'fg-subtle': withOpacityValue('--color-fg-subtle'),
    'fg-on-emphasis': withOpacityValue('--color-fg-on-emphasis'),
    'canvas-default': withOpacityValue('--color-canvas-default'),
    'canvas-overlay': withOpacityValue('--color-canvas-overlay'),
    'canvas-inset': withOpacityValue('--color-canvas-inset'),
    'canvas-subtle': withOpacityValue('--color-canvas-subtle'),
    'border-default': withOpacityValue('--color-border-default'),
    'border-muted': withOpacityValue('--color-border-muted'),
    'border-subtle': withOpacityValue('--color-border-subtle'),
    'shadow-small': '--color-shadow-small',
    'shadow-medium': '--color-shadow-medium',
    'shadow-large': '--color-shadow-large',
    'shadow-extra-large': '--color-shadow-extra-large',
    'neutral-emphasis-plus': withOpacityValue('--color-neutral-emphasis-plus'),
    'neutral-emphasis': withOpacityValue('--color-neutral-emphasis'),
    'neutral-muted': withOpacityValue('--color-neutral-muted'),
    'neutral-subtle': withOpacityValue('--color-neutral-subtle'),
    'accent-fg': withOpacityValue('--color-accent-fg'),
    'accent-emphasis': withOpacityValue('--color-accent-emphasis'),
    'accent-muted': withOpacityValue('--color-accent-muted'),
    'accent-subtle': withOpacityValue('--color-accent-subtle'),
    'success-fg': withOpacityValue('--color-success-fg'),
    'success-emphasis': withOpacityValue('--color-success-emphasis'),
    'success-muted': withOpacityValue('--color-success-muted'),
    'success-subtle': withOpacityValue('--color-success-subtle'),
    'attention-fg': withOpacityValue('--color-attention-fg'),
    'attention-emphasis': withOpacityValue('--color-attention-emphasis'),
    'attention-muted': withOpacityValue('--color-attention-muted'),
    'attention-subtle': withOpacityValue('--color-attention-subtle'),
    'severe-fg': withOpacityValue('--color-severe-fg'),
    'severe-emphasis': withOpacityValue('--color-severe-emphasis'),
    'severe-muted': withOpacityValue('--color-severe-muted'),
    'severe-subtle': withOpacityValue('--color-severe-subtle'),
    'danger-fg': withOpacityValue('--color-danger-fg'),
    'danger-emphasis': withOpacityValue('--color-danger-emphasis'),
    'danger-muted': withOpacityValue('--color-danger-muted'),
    'danger-subtle': withOpacityValue('--color-danger-subtle'),
    'done-fg': withOpacityValue('--color-done-fg'),
    'done-emphasis': withOpacityValue('--color-done-emphasis'),
    'done-muted': withOpacityValue('--color-done-muted'),
    'done-subtle': withOpacityValue('--color-done-subtle'),
    'sponsors-fg': withOpacityValue('--color-sponsors-fg'),
    'sponsors-emphasis': withOpacityValue('--color-sponsors-emphasis'),
    'sponsors-muted': withOpacityValue('--color-sponsors-muted'),
    'sponsors-subtle': withOpacityValue('--color-sponsors-subtle'),
    'primer-fg-disabled': withOpacityValue('--color-primer-fg-disabled'),
    'primer-canvas-backdrop': withOpacityValue(
      '--color-primer-canvas-backdrop'
    ),
    'primer-canvas-sticky': withOpacityValue('--color-primer-canvas-sticky'),
    'primer-border-active': withOpacityValue('--color-primer-border-active'),
    'primer-border-contrast': withOpacityValue(
      '--color-primer-border-contrast'
    ),
    'primer-shadow-highlight': '--color-primer-shadow-highlight',
    'primer-shadow-inset': '--color-primer-shadow-inset',
    'primer-shadow-focus': '--color-primer-shadow-focus',
    'scale-black': withOpacityValue('--color-scale-black'),
    'scale-white': withOpacityValue('--color-scale-white'),
    'scale-gray-0': withOpacityValue('--color-scale-gray-0'),
    'scale-gray-1': withOpacityValue('--color-scale-gray-1'),
    'scale-gray-2': withOpacityValue('--color-scale-gray-2'),
    'scale-gray-3': withOpacityValue('--color-scale-gray-3'),
    'scale-gray-4': withOpacityValue('--color-scale-gray-4'),
    'scale-gray-5': withOpacityValue('--color-scale-gray-5'),
    'scale-gray-6': withOpacityValue('--color-scale-gray-6'),
    'scale-gray-7': withOpacityValue('--color-scale-gray-7'),
    'scale-gray-8': withOpacityValue('--color-scale-gray-8'),
    'scale-gray-9': withOpacityValue('--color-scale-gray-9'),
    'scale-blue-0': withOpacityValue('--color-scale-blue-0'),
    'scale-blue-1': withOpacityValue('--color-scale-blue-1'),
    'scale-blue-2': withOpacityValue('--color-scale-blue-2'),
    'scale-blue-3': withOpacityValue('--color-scale-blue-3'),
    'scale-blue-4': withOpacityValue('--color-scale-blue-4'),
    'scale-blue-5': withOpacityValue('--color-scale-blue-5'),
    'scale-blue-6': withOpacityValue('--color-scale-blue-6'),
    'scale-blue-7': withOpacityValue('--color-scale-blue-7'),
    'scale-blue-8': withOpacityValue('--color-scale-blue-8'),
    'scale-blue-9': withOpacityValue('--color-scale-blue-9'),
    'scale-green-0': withOpacityValue('--color-scale-green-0'),
    'scale-green-1': withOpacityValue('--color-scale-green-1'),
    'scale-green-2': withOpacityValue('--color-scale-green-2'),
    'scale-green-3': withOpacityValue('--color-scale-green-3'),
    'scale-green-4': withOpacityValue('--color-scale-green-4'),
    'scale-green-5': withOpacityValue('--color-scale-green-5'),
    'scale-green-6': withOpacityValue('--color-scale-green-6'),
    'scale-green-7': withOpacityValue('--color-scale-green-7'),
    'scale-green-8': withOpacityValue('--color-scale-green-8'),
    'scale-green-9': withOpacityValue('--color-scale-green-9'),
    'scale-yellow-0': withOpacityValue('--color-scale-yellow-0'),
    'scale-yellow-1': withOpacityValue('--color-scale-yellow-1'),
    'scale-yellow-2': withOpacityValue('--color-scale-yellow-2'),
    'scale-yellow-3': withOpacityValue('--color-scale-yellow-3'),
    'scale-yellow-4': withOpacityValue('--color-scale-yellow-4'),
    'scale-yellow-5': withOpacityValue('--color-scale-yellow-5'),
    'scale-yellow-6': withOpacityValue('--color-scale-yellow-6'),
    'scale-yellow-7': withOpacityValue('--color-scale-yellow-7'),
    'scale-yellow-8': withOpacityValue('--color-scale-yellow-8'),
    'scale-yellow-9': withOpacityValue('--color-scale-yellow-9'),
    'scale-orange-0': withOpacityValue('--color-scale-orange-0'),
    'scale-orange-1': withOpacityValue('--color-scale-orange-1'),
    'scale-orange-2': withOpacityValue('--color-scale-orange-2'),
    'scale-orange-3': withOpacityValue('--color-scale-orange-3'),
    'scale-orange-4': withOpacityValue('--color-scale-orange-4'),
    'scale-orange-5': withOpacityValue('--color-scale-orange-5'),
    'scale-orange-6': withOpacityValue('--color-scale-orange-6'),
    'scale-orange-7': withOpacityValue('--color-scale-orange-7'),
    'scale-orange-8': withOpacityValue('--color-scale-orange-8'),
    'scale-orange-9': withOpacityValue('--color-scale-orange-9'),
    'scale-red-0': withOpacityValue('--color-scale-red-0'),
    'scale-red-1': withOpacityValue('--color-scale-red-1'),
    'scale-red-2': withOpacityValue('--color-scale-red-2'),
    'scale-red-3': withOpacityValue('--color-scale-red-3'),
    'scale-red-4': withOpacityValue('--color-scale-red-4'),
    'scale-red-5': withOpacityValue('--color-scale-red-5'),
    'scale-red-6': withOpacityValue('--color-scale-red-6'),
    'scale-red-7': withOpacityValue('--color-scale-red-7'),
    'scale-red-8': withOpacityValue('--color-scale-red-8'),
    'scale-red-9': withOpacityValue('--color-scale-red-9'),
    'scale-purple-0': withOpacityValue('--color-scale-purple-0'),
    'scale-purple-1': withOpacityValue('--color-scale-purple-1'),
    'scale-purple-2': withOpacityValue('--color-scale-purple-2'),
    'scale-purple-3': withOpacityValue('--color-scale-purple-3'),
    'scale-purple-4': withOpacityValue('--color-scale-purple-4'),
    'scale-purple-5': withOpacityValue('--color-scale-purple-5'),
    'scale-purple-6': withOpacityValue('--color-scale-purple-6'),
    'scale-purple-7': withOpacityValue('--color-scale-purple-7'),
    'scale-purple-8': withOpacityValue('--color-scale-purple-8'),
    'scale-purple-9': withOpacityValue('--color-scale-purple-9'),
    'scale-pink-0': withOpacityValue('--color-scale-pink-0'),
    'scale-pink-1': withOpacityValue('--color-scale-pink-1'),
    'scale-pink-2': withOpacityValue('--color-scale-pink-2'),
    'scale-pink-3': withOpacityValue('--color-scale-pink-3'),
    'scale-pink-4': withOpacityValue('--color-scale-pink-4'),
    'scale-pink-5': withOpacityValue('--color-scale-pink-5'),
    'scale-pink-6': withOpacityValue('--color-scale-pink-6'),
    'scale-pink-7': withOpacityValue('--color-scale-pink-7'),
    'scale-pink-8': withOpacityValue('--color-scale-pink-8'),
    'scale-pink-9': withOpacityValue('--color-scale-pink-9'),
    'scale-coral-0': withOpacityValue('--color-scale-coral-0'),
    'scale-coral-1': withOpacityValue('--color-scale-coral-1'),
    'scale-coral-2': withOpacityValue('--color-scale-coral-2'),
    'scale-coral-3': withOpacityValue('--color-scale-coral-3'),
    'scale-coral-4': withOpacityValue('--color-scale-coral-4'),
    'scale-coral-5': withOpacityValue('--color-scale-coral-5'),
    'scale-coral-6': withOpacityValue('--color-scale-coral-6'),
    'scale-coral-7': withOpacityValue('--color-scale-coral-7'),
    'scale-coral-8': withOpacityValue('--color-scale-coral-8'),
    'scale-coral-9': withOpacityValue('--color-scale-coral-9'),
  },
}
