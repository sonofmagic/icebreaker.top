import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string
    usePathKey?: boolean
  }
}
