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
    '--color-canvas-default-transparent': withOpacityValue('--color-canvas-default-transparent'),
    '--color-marketing-icon-primary': withOpacityValue('--color-marketing-icon-primary'),
    '--color-marketing-icon-secondary': withOpacityValue('--color-marketing-icon-secondary'),
    '--color-diff-blob-addition-num-text': withOpacityValue('--color-diff-blob-addition-num-text'),
    '--color-diff-blob-addition-fg': withOpacityValue('--color-diff-blob-addition-fg'),
    '--color-diff-blob-addition-num-bg': withOpacityValue('--color-diff-blob-addition-num-bg'),
    '--color-diff-blob-addition-line-bg': withOpacityValue('--color-diff-blob-addition-line-bg'),
    '--color-diff-blob-addition-word-bg': withOpacityValue('--color-diff-blob-addition-word-bg'),
    '--color-diff-blob-deletion-num-text': withOpacityValue('--color-diff-blob-deletion-num-text'),
    '--color-diff-blob-deletion-fg': withOpacityValue('--color-diff-blob-deletion-fg'),
    '--color-diff-blob-deletion-num-bg': withOpacityValue('--color-diff-blob-deletion-num-bg'),
    '--color-diff-blob-deletion-line-bg': withOpacityValue('--color-diff-blob-deletion-line-bg'),
    '--color-diff-blob-deletion-word-bg': withOpacityValue('--color-diff-blob-deletion-word-bg'),
    '--color-diff-blob-hunk-num-bg': withOpacityValue('--color-diff-blob-hunk-num-bg'),
    '--color-diff-blob-expander-icon': withOpacityValue('--color-diff-blob-expander-icon'),
    '--color-diff-blob-selected-line-highlight-mix-blend-mode': withOpacityValue('--color-diff-blob-selected-line-highlight-mix-blend-mode'),
    '--color-diffstat-deletion-border': withOpacityValue('--color-diffstat-deletion-border'),
    '--color-diffstat-addition-border': withOpacityValue('--color-diffstat-addition-border'),
    '--color-diffstat-addition-bg': withOpacityValue('--color-diffstat-addition-bg'),
    '--color-search-keyword-hl': withOpacityValue('--color-search-keyword-hl'),
    '--color-prettylights-syntax-comment': withOpacityValue('--color-prettylights-syntax-comment'),
    '--color-prettylights-syntax-constant': withOpacityValue('--color-prettylights-syntax-constant'),
    '--color-prettylights-syntax-entity': withOpacityValue('--color-prettylights-syntax-entity'),
    '--color-prettylights-syntax-storage-modifier-import': withOpacityValue('--color-prettylights-syntax-storage-modifier-import'),
    '--color-prettylights-syntax-entity-tag': withOpacityValue('--color-prettylights-syntax-entity-tag'),
    '--color-prettylights-syntax-keyword': withOpacityValue('--color-prettylights-syntax-keyword'),
    '--color-prettylights-syntax-string': withOpacityValue('--color-prettylights-syntax-string'),
    '--color-prettylights-syntax-variable': withOpacityValue('--color-prettylights-syntax-variable'),
    '--color-prettylights-syntax-brackethighlighter-unmatched': withOpacityValue('--color-prettylights-syntax-brackethighlighter-unmatched'),
    '--color-prettylights-syntax-invalid-illegal-text': withOpacityValue('--color-prettylights-syntax-invalid-illegal-text'),
    '--color-prettylights-syntax-invalid-illegal-bg': withOpacityValue('--color-prettylights-syntax-invalid-illegal-bg'),
    '--color-prettylights-syntax-carriage-return-text': withOpacityValue('--color-prettylights-syntax-carriage-return-text'),
    '--color-prettylights-syntax-carriage-return-bg': withOpacityValue('--color-prettylights-syntax-carriage-return-bg'),
    '--color-prettylights-syntax-string-regexp': withOpacityValue('--color-prettylights-syntax-string-regexp'),
    '--color-prettylights-syntax-markup-list': withOpacityValue('--color-prettylights-syntax-markup-list'),
    '--color-prettylights-syntax-markup-heading': withOpacityValue('--color-prettylights-syntax-markup-heading'),
    '--color-prettylights-syntax-markup-italic': withOpacityValue('--color-prettylights-syntax-markup-italic'),
    '--color-prettylights-syntax-markup-bold': withOpacityValue('--color-prettylights-syntax-markup-bold'),
    '--color-prettylights-syntax-markup-deleted-text': withOpacityValue('--color-prettylights-syntax-markup-deleted-text'),
    '--color-prettylights-syntax-markup-deleted-bg': withOpacityValue('--color-prettylights-syntax-markup-deleted-bg'),
    '--color-prettylights-syntax-markup-inserted-text': withOpacityValue('--color-prettylights-syntax-markup-inserted-text'),
    '--color-prettylights-syntax-markup-inserted-bg': withOpacityValue('--color-prettylights-syntax-markup-inserted-bg'),
    '--color-prettylights-syntax-markup-changed-text': withOpacityValue('--color-prettylights-syntax-markup-changed-text'),
    '--color-prettylights-syntax-markup-changed-bg': withOpacityValue('--color-prettylights-syntax-markup-changed-bg'),
    '--color-prettylights-syntax-markup-ignored-text': withOpacityValue('--color-prettylights-syntax-markup-ignored-text'),
    '--color-prettylights-syntax-markup-ignored-bg': withOpacityValue('--color-prettylights-syntax-markup-ignored-bg'),
    '--color-prettylights-syntax-meta-diff-range': withOpacityValue('--color-prettylights-syntax-meta-diff-range'),
    '--color-prettylights-syntax-brackethighlighter-angle': withOpacityValue('--color-prettylights-syntax-brackethighlighter-angle'),
    '--color-prettylights-syntax-sublimelinter-gutter-mark': withOpacityValue('--color-prettylights-syntax-sublimelinter-gutter-mark'),
    '--color-prettylights-syntax-constant-other-reference-link': withOpacityValue('--color-prettylights-syntax-constant-other-reference-link'),
    '--color-codemirror-text': withOpacityValue('--color-codemirror-text'),
    '--color-codemirror-bg': withOpacityValue('--color-codemirror-bg'),
    '--color-codemirror-gutters-bg': withOpacityValue('--color-codemirror-gutters-bg'),
    '--color-codemirror-guttermarker-text': withOpacityValue('--color-codemirror-guttermarker-text'),
    '--color-codemirror-guttermarker-subtle-text': withOpacityValue('--color-codemirror-guttermarker-subtle-text'),
    '--color-codemirror-linenumber-text': withOpacityValue('--color-codemirror-linenumber-text'),
    '--color-codemirror-cursor': withOpacityValue('--color-codemirror-cursor'),
    '--color-codemirror-selection-bg': withOpacityValue('--color-codemirror-selection-bg'),
    '--color-codemirror-activeline-bg': withOpacityValue('--color-codemirror-activeline-bg'),
    '--color-codemirror-matchingbracket-text': withOpacityValue('--color-codemirror-matchingbracket-text'),
    '--color-codemirror-lines-bg': withOpacityValue('--color-codemirror-lines-bg'),
    '--color-codemirror-syntax-comment': withOpacityValue('--color-codemirror-syntax-comment'),
    '--color-codemirror-syntax-constant': withOpacityValue('--color-codemirror-syntax-constant'),
    '--color-codemirror-syntax-entity': withOpacityValue('--color-codemirror-syntax-entity'),
    '--color-codemirror-syntax-keyword': withOpacityValue('--color-codemirror-syntax-keyword'),
    '--color-codemirror-syntax-storage': withOpacityValue('--color-codemirror-syntax-storage'),
    '--color-codemirror-syntax-string': withOpacityValue('--color-codemirror-syntax-string'),
    '--color-codemirror-syntax-support': withOpacityValue('--color-codemirror-syntax-support'),
    '--color-codemirror-syntax-variable': withOpacityValue('--color-codemirror-syntax-variable'),
    '--color-checks-bg': withOpacityValue('--color-checks-bg'),
    '--color-checks-run-border-width': withOpacityValue('--color-checks-run-border-width'),
    '--color-checks-container-border-width': withOpacityValue('--color-checks-container-border-width'),
    '--color-checks-text-primary': withOpacityValue('--color-checks-text-primary'),
    '--color-checks-text-secondary': withOpacityValue('--color-checks-text-secondary'),
    '--color-checks-text-link': withOpacityValue('--color-checks-text-link'),
    '--color-checks-btn-icon': withOpacityValue('--color-checks-btn-icon'),
    '--color-checks-btn-hover-icon': withOpacityValue('--color-checks-btn-hover-icon'),
    '--color-checks-btn-hover-bg': withOpacityValue('--color-checks-btn-hover-bg'),
    '--color-checks-input-text': withOpacityValue('--color-checks-input-text'),
    '--color-checks-input-placeholder-text': withOpacityValue('--color-checks-input-placeholder-text'),
    '--color-checks-input-focus-text': withOpacityValue('--color-checks-input-focus-text'),
    '--color-checks-input-bg': withOpacityValue('--color-checks-input-bg'),
    '--color-checks-donut-error': withOpacityValue('--color-checks-donut-error'),
    '--color-checks-donut-pending': withOpacityValue('--color-checks-donut-pending'),
    '--color-checks-donut-success': withOpacityValue('--color-checks-donut-success'),
    '--color-checks-donut-neutral': withOpacityValue('--color-checks-donut-neutral'),
    '--color-checks-dropdown-text': withOpacityValue('--color-checks-dropdown-text'),
    '--color-checks-dropdown-bg': withOpacityValue('--color-checks-dropdown-bg'),
    '--color-checks-dropdown-border': withOpacityValue('--color-checks-dropdown-border'),
    '--color-checks-dropdown-shadow': withOpacityValue('--color-checks-dropdown-shadow'),
    '--color-checks-dropdown-hover-text': withOpacityValue('--color-checks-dropdown-hover-text'),
    '--color-checks-dropdown-hover-bg': withOpacityValue('--color-checks-dropdown-hover-bg'),
    '--color-checks-dropdown-btn-hover-text': withOpacityValue('--color-checks-dropdown-btn-hover-text'),
    '--color-checks-dropdown-btn-hover-bg': withOpacityValue('--color-checks-dropdown-btn-hover-bg'),
    '--color-checks-scrollbar-thumb-bg': withOpacityValue('--color-checks-scrollbar-thumb-bg'),
    '--color-checks-header-label-text': withOpacityValue('--color-checks-header-label-text'),
    '--color-checks-header-label-open-text': withOpacityValue('--color-checks-header-label-open-text'),
    '--color-checks-header-border': withOpacityValue('--color-checks-header-border'),
    '--color-checks-header-icon': withOpacityValue('--color-checks-header-icon'),
    '--color-checks-line-text': withOpacityValue('--color-checks-line-text'),
    '--color-checks-line-num-text': withOpacityValue('--color-checks-line-num-text'),
    '--color-checks-line-timestamp-text': withOpacityValue('--color-checks-line-timestamp-text'),
    '--color-checks-line-hover-bg': withOpacityValue('--color-checks-line-hover-bg'),
    '--color-checks-line-selected-bg': withOpacityValue('--color-checks-line-selected-bg'),
    '--color-checks-line-selected-num-text': withOpacityValue('--color-checks-line-selected-num-text'),
    '--color-checks-line-dt-fm-text': withOpacityValue('--color-checks-line-dt-fm-text'),
    '--color-checks-line-dt-fm-bg': withOpacityValue('--color-checks-line-dt-fm-bg'),
    '--color-checks-gate-bg': withOpacityValue('--color-checks-gate-bg'),
    '--color-checks-gate-text': withOpacityValue('--color-checks-gate-text'),
    '--color-checks-gate-waiting-text': withOpacityValue('--color-checks-gate-waiting-text'),
    '--color-checks-step-header-open-bg': withOpacityValue('--color-checks-step-header-open-bg'),
    '--color-checks-step-error-text': withOpacityValue('--color-checks-step-error-text'),
    '--color-checks-step-warning-text': withOpacityValue('--color-checks-step-warning-text'),
    '--color-checks-logline-text': withOpacityValue('--color-checks-logline-text'),
    '--color-checks-logline-num-text': withOpacityValue('--color-checks-logline-num-text'),
    '--color-checks-logline-debug-text': withOpacityValue('--color-checks-logline-debug-text'),
    '--color-checks-logline-error-text': withOpacityValue('--color-checks-logline-error-text'),
    '--color-checks-logline-error-num-text': withOpacityValue('--color-checks-logline-error-num-text'),
    '--color-checks-logline-error-bg': withOpacityValue('--color-checks-logline-error-bg'),
    '--color-checks-logline-warning-text': withOpacityValue('--color-checks-logline-warning-text'),
    '--color-checks-logline-warning-num-text': withOpacityValue('--color-checks-logline-warning-num-text'),
    '--color-checks-logline-warning-bg': withOpacityValue('--color-checks-logline-warning-bg'),
    '--color-checks-logline-command-text': withOpacityValue('--color-checks-logline-command-text'),
    '--color-checks-logline-section-text': withOpacityValue('--color-checks-logline-section-text'),
    '--color-checks-ansi-black': withOpacityValue('--color-checks-ansi-black'),
    '--color-checks-ansi-black-bright': withOpacityValue('--color-checks-ansi-black-bright'),
    '--color-checks-ansi-white': withOpacityValue('--color-checks-ansi-white'),
    '--color-checks-ansi-white-bright': withOpacityValue('--color-checks-ansi-white-bright'),
    '--color-checks-ansi-gray': withOpacityValue('--color-checks-ansi-gray'),
    '--color-checks-ansi-red': withOpacityValue('--color-checks-ansi-red'),
    '--color-checks-ansi-red-bright': withOpacityValue('--color-checks-ansi-red-bright'),
    '--color-checks-ansi-green': withOpacityValue('--color-checks-ansi-green'),
    '--color-checks-ansi-green-bright': withOpacityValue('--color-checks-ansi-green-bright'),
    '--color-checks-ansi-yellow': withOpacityValue('--color-checks-ansi-yellow'),
    '--color-checks-ansi-yellow-bright': withOpacityValue('--color-checks-ansi-yellow-bright'),
    '--color-checks-ansi-blue': withOpacityValue('--color-checks-ansi-blue'),
    '--color-checks-ansi-blue-bright': withOpacityValue('--color-checks-ansi-blue-bright'),
    '--color-checks-ansi-magenta': withOpacityValue('--color-checks-ansi-magenta'),
    '--color-checks-ansi-magenta-bright': withOpacityValue('--color-checks-ansi-magenta-bright'),
    '--color-checks-ansi-cyan': withOpacityValue('--color-checks-ansi-cyan'),
    '--color-checks-ansi-cyan-bright': withOpacityValue('--color-checks-ansi-cyan-bright'),
    '--color-project-header-bg': withOpacityValue('--color-project-header-bg'),
    '--color-project-sidebar-bg': withOpacityValue('--color-project-sidebar-bg'),
    '--color-project-gradient-in': withOpacityValue('--color-project-gradient-in'),
    '--color-project-gradient-out': withOpacityValue('--color-project-gradient-out'),
    '--color-mktg-btn-bg': withOpacityValue('--color-mktg-btn-bg'),
    '--color-mktg-btn-shadow-outline': withOpacityValue('--color-mktg-btn-shadow-outline'),
    '--color-mktg-btn-shadow-focus': withOpacityValue('--color-mktg-btn-shadow-focus'),
    '--color-mktg-btn-shadow-hover': withOpacityValue('--color-mktg-btn-shadow-hover'),
    '--color-mktg-btn-shadow-hover-muted': withOpacityValue('--color-mktg-btn-shadow-hover-muted'),
    '--color-avatar-bg': withOpacityValue('--color-avatar-bg'),
    '--color-avatar-border': withOpacityValue('--color-avatar-border'),
    '--color-avatar-stack-fade': withOpacityValue('--color-avatar-stack-fade'),
    '--color-avatar-stack-fade-more': withOpacityValue('--color-avatar-stack-fade-more'),
    '--color-avatar-child-shadow': withOpacityValue('--color-avatar-child-shadow'),
    '--color-topic-tag-border': withOpacityValue('--color-topic-tag-border'),
    '--color-counter-border': withOpacityValue('--color-counter-border'),
    '--color-select-menu-backdrop-border': withOpacityValue('--color-select-menu-backdrop-border'),
    '--color-select-menu-tap-highlight': withOpacityValue('--color-select-menu-tap-highlight'),
    '--color-select-menu-tap-focus-bg': withOpacityValue('--color-select-menu-tap-focus-bg'),
    '--color-overlay-shadow': withOpacityValue('--color-overlay-shadow'),
    '--color-header-text': withOpacityValue('--color-header-text'),
    '--color-header-bg': withOpacityValue('--color-header-bg'),
    '--color-header-divider': withOpacityValue('--color-header-divider'),
    '--color-header-logo': withOpacityValue('--color-header-logo'),
    '--color-header-search-bg': withOpacityValue('--color-header-search-bg'),
    '--color-header-search-border': withOpacityValue('--color-header-search-border'),
    '--color-sidenav-selected-bg': withOpacityValue('--color-sidenav-selected-bg'),
    '--color-menu-bg-active': withOpacityValue('--color-menu-bg-active'),
    '--color-input-disabled-bg': withOpacityValue('--color-input-disabled-bg'),
    '--color-timeline-badge-bg': withOpacityValue('--color-timeline-badge-bg'),
    '--color-ansi-black': withOpacityValue('--color-ansi-black'),
    '--color-ansi-black-bright': withOpacityValue('--color-ansi-black-bright'),
    '--color-ansi-white': withOpacityValue('--color-ansi-white'),
    '--color-ansi-white-bright': withOpacityValue('--color-ansi-white-bright'),
    '--color-ansi-gray': withOpacityValue('--color-ansi-gray'),
    '--color-ansi-red': withOpacityValue('--color-ansi-red'),
    '--color-ansi-red-bright': withOpacityValue('--color-ansi-red-bright'),
    '--color-ansi-green': withOpacityValue('--color-ansi-green'),
    '--color-ansi-green-bright': withOpacityValue('--color-ansi-green-bright'),
    '--color-ansi-yellow': withOpacityValue('--color-ansi-yellow'),
    '--color-ansi-yellow-bright': withOpacityValue('--color-ansi-yellow-bright'),
    '--color-ansi-blue': withOpacityValue('--color-ansi-blue'),
    '--color-ansi-blue-bright': withOpacityValue('--color-ansi-blue-bright'),
    '--color-ansi-magenta': withOpacityValue('--color-ansi-magenta'),
    '--color-ansi-magenta-bright': withOpacityValue('--color-ansi-magenta-bright'),
    '--color-ansi-cyan': withOpacityValue('--color-ansi-cyan'),
    '--color-ansi-cyan-bright': withOpacityValue('--color-ansi-cyan-bright'),
    '--color-btn-text': withOpacityValue('--color-btn-text'),
    '--color-btn-bg': withOpacityValue('--color-btn-bg'),
    '--color-btn-border': withOpacityValue('--color-btn-border'),
    '--color-btn-shadow': withOpacityValue('--color-btn-shadow'),
    '--color-btn-inset-shadow': withOpacityValue('--color-btn-inset-shadow'),
    '--color-btn-hover-bg': withOpacityValue('--color-btn-hover-bg'),
    '--color-btn-hover-border': withOpacityValue('--color-btn-hover-border'),
    '--color-btn-active-bg': withOpacityValue('--color-btn-active-bg'),
    '--color-btn-active-border': withOpacityValue('--color-btn-active-border'),
    '--color-btn-selected-bg': withOpacityValue('--color-btn-selected-bg'),
    '--color-btn-focus-bg': withOpacityValue('--color-btn-focus-bg'),
    '--color-btn-focus-border': withOpacityValue('--color-btn-focus-border'),
    '--color-btn-focus-shadow': withOpacityValue('--color-btn-focus-shadow'),
    '--color-btn-shadow-active': withOpacityValue('--color-btn-shadow-active'),
    '--color-btn-shadow-input-focus': withOpacityValue('--color-btn-shadow-input-focus'),
    '--color-btn-counter-bg': withOpacityValue('--color-btn-counter-bg'),
    '--color-btn-primary-text': withOpacityValue('--color-btn-primary-text'),
    '--color-btn-primary-bg': withOpacityValue('--color-btn-primary-bg'),
    '--color-btn-primary-border': withOpacityValue('--color-btn-primary-border'),
    '--color-btn-primary-shadow': withOpacityValue('--color-btn-primary-shadow'),
    '--color-btn-primary-inset-shadow': withOpacityValue('--color-btn-primary-inset-shadow'),
    '--color-btn-primary-hover-bg': withOpacityValue('--color-btn-primary-hover-bg'),
    '--color-btn-primary-hover-border': withOpacityValue('--color-btn-primary-hover-border'),
    '--color-btn-primary-selected-bg': withOpacityValue('--color-btn-primary-selected-bg'),
    '--color-btn-primary-selected-shadow': withOpacityValue('--color-btn-primary-selected-shadow'),
    '--color-btn-primary-disabled-text': withOpacityValue('--color-btn-primary-disabled-text'),
    '--color-btn-primary-disabled-bg': withOpacityValue('--color-btn-primary-disabled-bg'),
    '--color-btn-primary-disabled-border': withOpacityValue('--color-btn-primary-disabled-border'),
    '--color-btn-primary-focus-bg': withOpacityValue('--color-btn-primary-focus-bg'),
    '--color-btn-primary-focus-border': withOpacityValue('--color-btn-primary-focus-border'),
    '--color-btn-primary-focus-shadow': withOpacityValue('--color-btn-primary-focus-shadow'),
    '--color-btn-primary-icon': withOpacityValue('--color-btn-primary-icon'),
    '--color-btn-primary-counter-bg': withOpacityValue('--color-btn-primary-counter-bg'),
    '--color-btn-outline-text': withOpacityValue('--color-btn-outline-text'),
    '--color-btn-outline-hover-text': withOpacityValue('--color-btn-outline-hover-text'),
    '--color-btn-outline-hover-bg': withOpacityValue('--color-btn-outline-hover-bg'),
    '--color-btn-outline-hover-border': withOpacityValue('--color-btn-outline-hover-border'),
    '--color-btn-outline-hover-shadow': withOpacityValue('--color-btn-outline-hover-shadow'),
    '--color-btn-outline-hover-inset-shadow': withOpacityValue('--color-btn-outline-hover-inset-shadow'),
    '--color-btn-outline-hover-counter-bg': withOpacityValue('--color-btn-outline-hover-counter-bg'),
    '--color-btn-outline-selected-text': withOpacityValue('--color-btn-outline-selected-text'),
    '--color-btn-outline-selected-bg': withOpacityValue('--color-btn-outline-selected-bg'),
    '--color-btn-outline-selected-border': withOpacityValue('--color-btn-outline-selected-border'),
    '--color-btn-outline-selected-shadow': withOpacityValue('--color-btn-outline-selected-shadow'),
    '--color-btn-outline-disabled-text': withOpacityValue('--color-btn-outline-disabled-text'),
    '--color-btn-outline-disabled-bg': withOpacityValue('--color-btn-outline-disabled-bg'),
    '--color-btn-outline-disabled-counter-bg': withOpacityValue('--color-btn-outline-disabled-counter-bg'),
    '--color-btn-outline-focus-border': withOpacityValue('--color-btn-outline-focus-border'),
    '--color-btn-outline-focus-shadow': withOpacityValue('--color-btn-outline-focus-shadow'),
    '--color-btn-outline-counter-bg': withOpacityValue('--color-btn-outline-counter-bg'),
    '--color-btn-danger-text': withOpacityValue('--color-btn-danger-text'),
    '--color-btn-danger-hover-text': withOpacityValue('--color-btn-danger-hover-text'),
    '--color-btn-danger-hover-bg': withOpacityValue('--color-btn-danger-hover-bg'),
    '--color-btn-danger-hover-border': withOpacityValue('--color-btn-danger-hover-border'),
    '--color-btn-danger-hover-shadow': withOpacityValue('--color-btn-danger-hover-shadow'),
    '--color-btn-danger-hover-inset-shadow': withOpacityValue('--color-btn-danger-hover-inset-shadow'),
    '--color-btn-danger-hover-icon': withOpacityValue('--color-btn-danger-hover-icon'),
    '--color-btn-danger-hover-counter-bg': withOpacityValue('--color-btn-danger-hover-counter-bg'),
    '--color-btn-danger-selected-text': withOpacityValue('--color-btn-danger-selected-text'),
    '--color-btn-danger-selected-bg': withOpacityValue('--color-btn-danger-selected-bg'),
    '--color-btn-danger-selected-border': withOpacityValue('--color-btn-danger-selected-border'),
    '--color-btn-danger-selected-shadow': withOpacityValue('--color-btn-danger-selected-shadow'),
    '--color-btn-danger-disabled-text': withOpacityValue('--color-btn-danger-disabled-text'),
    '--color-btn-danger-disabled-bg': withOpacityValue('--color-btn-danger-disabled-bg'),
    '--color-btn-danger-disabled-counter-bg': withOpacityValue('--color-btn-danger-disabled-counter-bg'),
    '--color-btn-danger-focus-border': withOpacityValue('--color-btn-danger-focus-border'),
    '--color-btn-danger-focus-shadow': withOpacityValue('--color-btn-danger-focus-shadow'),
    '--color-btn-danger-counter-bg': withOpacityValue('--color-btn-danger-counter-bg'),
    '--color-btn-danger-icon': withOpacityValue('--color-btn-danger-icon'),
    '--color-underlinenav-icon': withOpacityValue('--color-underlinenav-icon'),
    '--color-underlinenav-border-hover': withOpacityValue('--color-underlinenav-border-hover'),
    '--color-action-list-item-inline-divider': withOpacityValue('--color-action-list-item-inline-divider'),
    '--color-action-list-item-default-hover-bg': withOpacityValue('--color-action-list-item-default-hover-bg'),
    '--color-action-list-item-default-active-bg': withOpacityValue('--color-action-list-item-default-active-bg'),
    '--color-action-list-item-default-selected-bg': withOpacityValue('--color-action-list-item-default-selected-bg'),
    '--color-action-list-item-danger-hover-bg': withOpacityValue('--color-action-list-item-danger-hover-bg'),
    '--color-action-list-item-danger-active-bg': withOpacityValue('--color-action-list-item-danger-active-bg'),
    '--color-action-list-item-danger-hover-text': withOpacityValue('--color-action-list-item-danger-hover-text'),
    '--color-fg-default': withOpacityValue('--color-fg-default'),
    '--color-fg-muted': withOpacityValue('--color-fg-muted'),
    '--color-fg-subtle': withOpacityValue('--color-fg-subtle'),
    '--color-fg-on-emphasis': withOpacityValue('--color-fg-on-emphasis'),
    '--color-canvas-default': withOpacityValue('--color-canvas-default'),
    '--color-canvas-overlay': withOpacityValue('--color-canvas-overlay'),
    '--color-canvas-inset': withOpacityValue('--color-canvas-inset'),
    '--color-canvas-subtle': withOpacityValue('--color-canvas-subtle'),
    '--color-border-default': withOpacityValue('--color-border-default'),
    '--color-border-muted': withOpacityValue('--color-border-muted'),
    '--color-border-subtle': withOpacityValue('--color-border-subtle'),
    '--color-shadow-small': withOpacityValue('--color-shadow-small'),
    '--color-shadow-medium': withOpacityValue('--color-shadow-medium'),
    '--color-shadow-large': withOpacityValue('--color-shadow-large'),
    '--color-shadow-extra-large': withOpacityValue('--color-shadow-extra-large'),
    '--color-neutral-emphasis-plus': withOpacityValue('--color-neutral-emphasis-plus'),
    '--color-neutral-emphasis': withOpacityValue('--color-neutral-emphasis'),
    '--color-neutral-muted': withOpacityValue('--color-neutral-muted'),
    '--color-neutral-subtle': withOpacityValue('--color-neutral-subtle'),
    '--color-accent-fg': withOpacityValue('--color-accent-fg'),
    '--color-accent-emphasis': withOpacityValue('--color-accent-emphasis'),
    '--color-accent-muted': withOpacityValue('--color-accent-muted'),
    '--color-accent-subtle': withOpacityValue('--color-accent-subtle'),
    '--color-success-fg': withOpacityValue('--color-success-fg'),
    '--color-success-emphasis': withOpacityValue('--color-success-emphasis'),
    '--color-success-muted': withOpacityValue('--color-success-muted'),
    '--color-success-subtle': withOpacityValue('--color-success-subtle'),
    '--color-attention-fg': withOpacityValue('--color-attention-fg'),
    '--color-attention-emphasis': withOpacityValue('--color-attention-emphasis'),
    '--color-attention-muted': withOpacityValue('--color-attention-muted'),
    '--color-attention-subtle': withOpacityValue('--color-attention-subtle'),
    '--color-severe-fg': withOpacityValue('--color-severe-fg'),
    '--color-severe-emphasis': withOpacityValue('--color-severe-emphasis'),
    '--color-severe-muted': withOpacityValue('--color-severe-muted'),
    '--color-severe-subtle': withOpacityValue('--color-severe-subtle'),
    '--color-danger-fg': withOpacityValue('--color-danger-fg'),
    '--color-danger-emphasis': withOpacityValue('--color-danger-emphasis'),
    '--color-danger-muted': withOpacityValue('--color-danger-muted'),
    '--color-danger-subtle': withOpacityValue('--color-danger-subtle'),
    '--color-done-fg': withOpacityValue('--color-done-fg'),
    '--color-done-emphasis': withOpacityValue('--color-done-emphasis'),
    '--color-done-muted': withOpacityValue('--color-done-muted'),
    '--color-done-subtle': withOpacityValue('--color-done-subtle'),
    '--color-sponsors-fg': withOpacityValue('--color-sponsors-fg'),
    '--color-sponsors-emphasis': withOpacityValue('--color-sponsors-emphasis'),
    '--color-sponsors-muted': withOpacityValue('--color-sponsors-muted'),
    '--color-sponsors-subtle': withOpacityValue('--color-sponsors-subtle'),
    '--color-primer-fg-disabled': withOpacityValue('--color-primer-fg-disabled'),
    '--color-primer-canvas-backdrop': withOpacityValue('--color-primer-canvas-backdrop'),
    '--color-primer-canvas-sticky': withOpacityValue('--color-primer-canvas-sticky'),
    '--color-primer-border-active': withOpacityValue('--color-primer-border-active'),
    '--color-primer-border-contrast': withOpacityValue('--color-primer-border-contrast'),
    '--color-primer-shadow-highlight': withOpacityValue('--color-primer-shadow-highlight'),
    '--color-primer-shadow-inset': withOpacityValue('--color-primer-shadow-inset'),
    '--color-primer-shadow-focus': withOpacityValue('--color-primer-shadow-focus'),
    '--color-scale-black': withOpacityValue('--color-scale-black'),
    '--color-scale-white': withOpacityValue('--color-scale-white'),
    '--color-scale-gray-0': withOpacityValue('--color-scale-gray-0'),
    '--color-scale-gray-1': withOpacityValue('--color-scale-gray-1'),
    '--color-scale-gray-2': withOpacityValue('--color-scale-gray-2'),
    '--color-scale-gray-3': withOpacityValue('--color-scale-gray-3'),
    '--color-scale-gray-4': withOpacityValue('--color-scale-gray-4'),
    '--color-scale-gray-5': withOpacityValue('--color-scale-gray-5'),
    '--color-scale-gray-6': withOpacityValue('--color-scale-gray-6'),
    '--color-scale-gray-7': withOpacityValue('--color-scale-gray-7'),
    '--color-scale-gray-8': withOpacityValue('--color-scale-gray-8'),
    '--color-scale-gray-9': withOpacityValue('--color-scale-gray-9'),
    '--color-scale-blue-0': withOpacityValue('--color-scale-blue-0'),
    '--color-scale-blue-1': withOpacityValue('--color-scale-blue-1'),
    '--color-scale-blue-2': withOpacityValue('--color-scale-blue-2'),
    '--color-scale-blue-3': withOpacityValue('--color-scale-blue-3'),
    '--color-scale-blue-4': withOpacityValue('--color-scale-blue-4'),
    '--color-scale-blue-5': withOpacityValue('--color-scale-blue-5'),
    '--color-scale-blue-6': withOpacityValue('--color-scale-blue-6'),
    '--color-scale-blue-7': withOpacityValue('--color-scale-blue-7'),
    '--color-scale-blue-8': withOpacityValue('--color-scale-blue-8'),
    '--color-scale-blue-9': withOpacityValue('--color-scale-blue-9'),
    '--color-scale-green-0': withOpacityValue('--color-scale-green-0'),
    '--color-scale-green-1': withOpacityValue('--color-scale-green-1'),
    '--color-scale-green-2': withOpacityValue('--color-scale-green-2'),
    '--color-scale-green-3': withOpacityValue('--color-scale-green-3'),
    '--color-scale-green-4': withOpacityValue('--color-scale-green-4'),
    '--color-scale-green-5': withOpacityValue('--color-scale-green-5'),
    '--color-scale-green-6': withOpacityValue('--color-scale-green-6'),
    '--color-scale-green-7': withOpacityValue('--color-scale-green-7'),
    '--color-scale-green-8': withOpacityValue('--color-scale-green-8'),
    '--color-scale-green-9': withOpacityValue('--color-scale-green-9'),
    '--color-scale-yellow-0': withOpacityValue('--color-scale-yellow-0'),
    '--color-scale-yellow-1': withOpacityValue('--color-scale-yellow-1'),
    '--color-scale-yellow-2': withOpacityValue('--color-scale-yellow-2'),
    '--color-scale-yellow-3': withOpacityValue('--color-scale-yellow-3'),
    '--color-scale-yellow-4': withOpacityValue('--color-scale-yellow-4'),
    '--color-scale-yellow-5': withOpacityValue('--color-scale-yellow-5'),
    '--color-scale-yellow-6': withOpacityValue('--color-scale-yellow-6'),
    '--color-scale-yellow-7': withOpacityValue('--color-scale-yellow-7'),
    '--color-scale-yellow-8': withOpacityValue('--color-scale-yellow-8'),
    '--color-scale-yellow-9': withOpacityValue('--color-scale-yellow-9'),
    '--color-scale-orange-0': withOpacityValue('--color-scale-orange-0'),
    '--color-scale-orange-1': withOpacityValue('--color-scale-orange-1'),
    '--color-scale-orange-2': withOpacityValue('--color-scale-orange-2'),
    '--color-scale-orange-3': withOpacityValue('--color-scale-orange-3'),
    '--color-scale-orange-4': withOpacityValue('--color-scale-orange-4'),
    '--color-scale-orange-5': withOpacityValue('--color-scale-orange-5'),
    '--color-scale-orange-6': withOpacityValue('--color-scale-orange-6'),
    '--color-scale-orange-7': withOpacityValue('--color-scale-orange-7'),
    '--color-scale-orange-8': withOpacityValue('--color-scale-orange-8'),
    '--color-scale-orange-9': withOpacityValue('--color-scale-orange-9'),
    '--color-scale-red-0': withOpacityValue('--color-scale-red-0'),
    '--color-scale-red-1': withOpacityValue('--color-scale-red-1'),
    '--color-scale-red-2': withOpacityValue('--color-scale-red-2'),
    '--color-scale-red-3': withOpacityValue('--color-scale-red-3'),
    '--color-scale-red-4': withOpacityValue('--color-scale-red-4'),
    '--color-scale-red-5': withOpacityValue('--color-scale-red-5'),
    '--color-scale-red-6': withOpacityValue('--color-scale-red-6'),
    '--color-scale-red-7': withOpacityValue('--color-scale-red-7'),
    '--color-scale-red-8': withOpacityValue('--color-scale-red-8'),
    '--color-scale-red-9': withOpacityValue('--color-scale-red-9'),
    '--color-scale-purple-0': withOpacityValue('--color-scale-purple-0'),
    '--color-scale-purple-1': withOpacityValue('--color-scale-purple-1'),
    '--color-scale-purple-2': withOpacityValue('--color-scale-purple-2'),
    '--color-scale-purple-3': withOpacityValue('--color-scale-purple-3'),
    '--color-scale-purple-4': withOpacityValue('--color-scale-purple-4'),
    '--color-scale-purple-5': withOpacityValue('--color-scale-purple-5'),
    '--color-scale-purple-6': withOpacityValue('--color-scale-purple-6'),
    '--color-scale-purple-7': withOpacityValue('--color-scale-purple-7'),
    '--color-scale-purple-8': withOpacityValue('--color-scale-purple-8'),
    '--color-scale-purple-9': withOpacityValue('--color-scale-purple-9'),
    '--color-scale-pink-0': withOpacityValue('--color-scale-pink-0'),
    '--color-scale-pink-1': withOpacityValue('--color-scale-pink-1'),
    '--color-scale-pink-2': withOpacityValue('--color-scale-pink-2'),
    '--color-scale-pink-3': withOpacityValue('--color-scale-pink-3'),
    '--color-scale-pink-4': withOpacityValue('--color-scale-pink-4'),
    '--color-scale-pink-5': withOpacityValue('--color-scale-pink-5'),
    '--color-scale-pink-6': withOpacityValue('--color-scale-pink-6'),
    '--color-scale-pink-7': withOpacityValue('--color-scale-pink-7'),
    '--color-scale-pink-8': withOpacityValue('--color-scale-pink-8'),
    '--color-scale-pink-9': withOpacityValue('--color-scale-pink-9'),
    '--color-scale-coral-0': withOpacityValue('--color-scale-coral-0'),
    '--color-scale-coral-1': withOpacityValue('--color-scale-coral-1'),
    '--color-scale-coral-2': withOpacityValue('--color-scale-coral-2'),
    '--color-scale-coral-3': withOpacityValue('--color-scale-coral-3'),
    '--color-scale-coral-4': withOpacityValue('--color-scale-coral-4'),
    '--color-scale-coral-5': withOpacityValue('--color-scale-coral-5'),
    '--color-scale-coral-6': withOpacityValue('--color-scale-coral-6'),
    '--color-scale-coral-7': withOpacityValue('--color-scale-coral-7'),
    '--color-scale-coral-8': withOpacityValue('--color-scale-coral-8'),
    '--color-scale-coral-9': withOpacityValue('--color-scale-coral-9'),
  }
}
