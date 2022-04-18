import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Selection',
    name: 'Selection',
    component: () => import('@/views/Selection.vue')
  },
  {
    path: '/LowCode',
    name: 'LowCode',
    component: () => import('@/views/LowCode.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/svg',
    name: 'Svg',
    component: () => import('@/views/Svg.vue')
  },
  {
    path: '/github',
    name: 'Github',
    component: () => import('@/views/Github.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('@/views/Table.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
