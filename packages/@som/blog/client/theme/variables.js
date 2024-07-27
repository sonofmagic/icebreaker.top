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
      return Object.entries(param).reduce((acc, [k, v]) => {
        if (typeof v === 'string') {
          this.setRootSingleVariable(k, v)
        } else if (typeof v === 'object') {
          this.setRootSingleVariable(k, v.value, v.priority)
        } else if (typeof v === 'function') {
          const value2 = this.getPropertyValue(k)
          const priority2 = this.getPropertyPriority(k)
          const { value, priority } = v({ value: value2, priority: priority2 })
          this.setRootSingleVariable(k, value, priority)
        }
        acc[k] = v
        return acc
      }, {})
    }
    throw new TypeError('param must be an object')
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

export const createGlobalThemeManager = () => {
  return new ThemeVariablesManager()
}

/**
 *
 * @param {HTMLElement} dom
 */
export const createDomThemeManager = (dom) => {
  return new ThemeVariablesManager(dom)
}

export const globalThemeVariablesManager = process.client
  ? new ThemeVariablesManager()
  : {}
