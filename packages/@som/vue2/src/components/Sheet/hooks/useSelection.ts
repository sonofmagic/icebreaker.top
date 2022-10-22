import { computed, defineComponent, ref, onMounted } from 'vue-demi'
import { pick } from 'lodash-es'
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
    // Object.entries(rect).forEach(([key, value]) => {
    //   if (value) {
    //     // @ts-ignore
    //     selectionPosition.value[key] = value
    //   }
    // })
    return Object.assign(selectionPosition.value, rect)
  }

  const reset = (col?: 'x' | 'y') => {
    if (col === 'x') {
      selectionPosition.value.width = resetSelectionPosition.value.width
      selectionPosition.value.left = resetSelectionPosition.value.left
      selectionPosition.value.right = resetSelectionPosition.value.right
    } else if (col === 'y') {
      selectionPosition.value.height = resetSelectionPosition.value.height
      selectionPosition.value.top = resetSelectionPosition.value.top
      selectionPosition.value.bottom = resetSelectionPosition.value.bottom
    } else {
      Object.assign(selectionPosition.value, resetSelectionPosition.value)
    }
  }
  const selectionBorderOffest = 0.5
  const selectionStyle = computed(() => {
    return Object.entries(pick(selectionPosition.value, ['left', 'right', 'top', 'bottom', 'width', 'height'])).reduce<Record<string, string>>((acc, [key, value]) => {
      if (['left', 'right', 'top', 'bottom'].includes(key)) {
        acc[key] = value - selectionBorderOffest + 'px'
      } else {
        acc[key] = value + 'px'
      }

      return acc
    }, {})
  })
  return {
    resetSelectionPosition,
    selectionPosition,
    selectionStartCell,
    selectionEndCell,
    startEventTarget,
    assign,
    reset,
    selectionStyle
  }
}
