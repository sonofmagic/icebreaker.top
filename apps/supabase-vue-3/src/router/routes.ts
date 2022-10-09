import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@/pages/index.vue')
      }
    ]
  }
]

export default routes
