import { useKeyModifier } from '@vueuse/core'
export default function useKeyBoard() {
  const shiftState = useKeyModifier('Shift')
  const controlState = useKeyModifier('Control')
  return {
    shiftState,
    controlState
  }
}
