export class ThemeVariablesManager {
  /**
   *
   * @param {HTMLElement} dom
   */
  constructor(dom) {
    this.root = dom || document.documentElement
    this.style = this.root.style
  }

  setRootVariables(param) {
    if (typeof param === 'object') {
      Object.entries(param).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          this.setRootSingleVariable(key, value)
        } else if (typeof value === 'object') {
          this.setRootSingleVariable(key, value.value, value.priority)
        }
        acc[key] = value
        return acc
      }, {})
    }
    this.style.setProperty()
  }

  /**
   *
   * @param {string} property
   * @param {string} value
   * @param {string=} priority // important
   */
  setRootSingleVariable(property, value, priority) {
    return this.style.setProperty(property, value, priority)
  }

  /**
   *
   * @param {string} property
   */
  removeProperty(property) {
    return this.style.removeProperty(property)
  }

  /**
   *
   * @param {number} index
   */
  item(index) {
    return this.style[index]
  }

  /**
   *
   * @param {string} property
   */
  getPropertyValue(property) {
    return this.style.getPropertyValue(property)
  }

  /**
   *
   * @param {string} property
   */
  getPropertyPriority(property) {
    return this.style.getPropertyPriority(property)
  }
}

export const globalThemeVariablesManager = process.client
  ? new ThemeVariablesManager()
  : {}
