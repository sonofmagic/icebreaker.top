import type { RouteLocationRaw } from 'vue-router'
import router from '@/router'
export function navigateTo(to: RouteLocationRaw) {
  return router.push(to)
}
