import type { InjectionKey, UnwrapNestedRefs } from 'vue'
import type { IState } from './types'
export const StateSymbol = Symbol('Login') as InjectionKey<
  UnwrapNestedRefs<IState>
>
