import { IPosition } from '../../types'

export interface IContextMenuContext {
  close: () => void
  show: (e: IPosition) => void
  el?: HTMLDivElement
}

export interface IContextMenuProps {
  context?: IContextMenuContext
}
