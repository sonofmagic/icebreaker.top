export interface IDataSourceItem {
  value: string
  id: string
  selected: boolean
  readonly: boolean
  disabled: boolean
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
