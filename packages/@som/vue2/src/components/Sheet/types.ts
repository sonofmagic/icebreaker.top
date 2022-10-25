export interface IDataSourceItem {
  value?: unknown
  id: string
  selected: boolean
  readonly: boolean
  disabled: boolean
  editing: boolean
  locked: boolean
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
