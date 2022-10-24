import { IContextMenuContext } from './type'
export function useContextMenu() {
  const context: IContextMenuContext = {
    show() {
      throw new Error('context is null')
    },
    close() {
      throw new Error('context is null')
    },
    el: undefined
  }
  return {
    context
  }
}
