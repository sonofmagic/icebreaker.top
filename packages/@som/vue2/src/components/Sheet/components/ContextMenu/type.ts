export interface IPosition {
  x: number
  y: number
}

export interface IContextMenuContext {
  close: () => void
  show: (e: IPosition) => void
  el?: HTMLDivElement
}

export interface IContextMenuProps {
  context?: IContextMenuContext
}
