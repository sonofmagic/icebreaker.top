import type { RouteLocationRaw } from 'vue-router'

export function navigateTo(to: RouteLocationRaw) {
  const router = useRouter()
  return router.push(to)
}
