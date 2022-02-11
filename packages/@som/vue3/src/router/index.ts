import { createRouter, createWebHistory } from 'vue-router'
import type { RouterOptions, RouteRecordRaw } from 'vue-router'
const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/index.vue')
      },
      {
        path: 'selection',
        component: () => import('@/pages/d3/selection/index.vue')
      }
    ]
  }
]

const options:RouterOptions = {
  history: createWebHistory(),
  routes
}

const router = createRouter(options)

export default router
