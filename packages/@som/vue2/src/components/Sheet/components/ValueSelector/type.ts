import { IPosition } from '../../types'

export interface IValueSelectorContext {
  close: () => void
  show: (e: IPosition) => void
  el?: HTMLDivElement
}
