import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth/index.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */'../layout/Basic/index.vue'),
    children: [
      {
        path: '/demands',
        name: 'DemandList',
        component: () => import(/* webpackChunkName: "DemandList" */'../views/DemandList/index.vue')
      },
      {
        path: '/demands/:id',
        name: 'DemandDetail',
        component: () => import(/* webpackChunkName: "DemandDetail" */'../views/DemandDetail/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
