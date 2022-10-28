import type { InjectionKey } from 'vue-demi'
import { ICellAttrs } from '../types'
export const CellEventsSymbol = Symbol('CellEventsSymbol') as InjectionKey<{
  contextmenu?: (payload: MouseEvent, attrs: ICellAttrs) => void
  mousedown?: (payload: MouseEvent, attrs: ICellAttrs) => void
  mouseup?: (payload: MouseEvent, attrs: ICellAttrs) => void
  mousemove?: (payload: MouseEvent, attrs: ICellAttrs) => void
  dblclick?: (payload: MouseEvent, attrs: ICellAttrs) => void
  mouseleave?: (payload: MouseEvent, attrs: ICellAttrs) => void
  mouseenter?: (payload: MouseEvent, attrs: ICellAttrs) => void
}>
