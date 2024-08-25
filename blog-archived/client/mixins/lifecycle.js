/* eslint-disable node/prefer-global/process */

/**
 *
 * @param {string} componentName
 * @returns
 */

function getValue(instance) {
  return Object.entries(instance).reduce((acc, [k, v]) => {
    // if (cur[0][0] === '$') {
    //   acc[cur[0]] = cur[1]
    // }
    acc[k] = v
    return acc
  }, {})
}
export function createLifecycleMxin(componentName) {
  /**
   * @type {import('vue/types/index').Component} lifecycleMxin
   */
  const lifecycleMxin = {
    data() {
      return {
        cctv: true,
      }
    },
    beforeCreate() {
      if (process.client) {
        console.log(`[${componentName}] beforeCreate`, getValue(this))
      }
    },
    created() {
      if (process.client) {
        console.log(`[${componentName}] created`, getValue(this))
      }
    },
    beforeMount() {
      console.log(`[${componentName}] beforeMount`, getValue(this))
    },
    mounted() {
      console.log(`[${componentName}] mounted`, getValue(this))
    },
    beforeDestroy() {
      console.log(`[${componentName}] beforeDestroy`, getValue(this))
    },
    destroyed() {
      console.log(`[${componentName}] destroyed`, getValue(this))
    },
  }
  return lifecycleMxin
}
