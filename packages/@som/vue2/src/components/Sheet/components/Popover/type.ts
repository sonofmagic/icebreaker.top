import { IPosition } from '../../types'

export interface IPopoverContext {
  close: () => void
  show: (e: IPosition) => void
  el?: HTMLDivElement
}
