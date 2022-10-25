import { reactive } from 'vue-demi'

import { IPopoverContext } from './type'
export function usePopover() {
  const context: IPopoverContext = reactive({
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
