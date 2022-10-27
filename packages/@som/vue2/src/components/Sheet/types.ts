export interface IDataSourceItem {
  value?: unknown
  id: string
  selected: boolean
  readonly: boolean
  disabled: boolean
  editing: boolean
  locked: boolean
  note?: string
}

export interface IDataSourceRow {
  key: string
  cells: IDataSourceItem[]
}

export interface ICellAttrs {
  rowIndex: number
  colIndex: number
  item: IDataSourceItem
}
export interface ISheetRowCustomEvent {
  event: MouseEvent
  attrs: ICellAttrs
}

export interface IPosition {
  x: number
  y: number
}

export interface IScrollOffset {
  scrollLeft: number
  scrollTop: number
}

export interface IColumn {
  key: string | number
  title: string
  width: number | string
}
