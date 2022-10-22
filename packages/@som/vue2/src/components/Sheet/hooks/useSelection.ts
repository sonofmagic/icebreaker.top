import { computed, defineComponent, ref, onMounted } from 'vue-demi'

export interface IDataSourceItem {
  value: string
  id: string
  selected: boolean
  readonly: boolean
  disabled: boolean
}

export interface ICellAttrs {
  rowIndex: number
  colIndex: number
  item: IDataSourceItem
}

export interface ISelectionRect {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

export default function useSelection () {
  const selectionPosition = ref<ISelectionRect>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0
  })

  const resetSelectionPosition = ref<ISelectionRect>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0
  })
  const selectionStartCell = ref<ICellAttrs>()
  const selectionEndCell = ref<ICellAttrs>()

  const startEventTarget = ref<EventTarget | null>()

  const assign = (rect: Partial<ISelectionRect>) => {
    Object.entries(rect).forEach(([key, value]) => {
      if (value) {
        // @ts-ignore
        selectionPosition.value[key] = value
      }
    })
    return selectionPosition.value
  }

  return {
    resetSelectionPosition,
    selectionPosition,
    selectionStartCell,
    selectionEndCell,
    startEventTarget,
    assign
  }
}
