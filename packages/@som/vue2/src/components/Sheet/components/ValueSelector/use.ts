import { reactive } from 'vue-demi'

import { IValueSelectorContext } from './type'
export function useValueSelector() {
  const context: IValueSelectorContext = reactive({
    show() {
      throw new Error('context is null')
    },
    close() {
      throw new Error('context is null')
    },
    el: undefined
  })
  return {
    context
  }
}
