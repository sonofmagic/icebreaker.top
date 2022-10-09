import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/pages/index.vue')
      },
      {
        path: 'account',
        name: 'AccountIndex',
        component: () => import('@/pages/account.vue')
      },
      {
        path: 'login',
        name: 'LoginIndex',
        component: () => import('@/pages/login.vue')
      }
    ]
  }
]

export default routes
