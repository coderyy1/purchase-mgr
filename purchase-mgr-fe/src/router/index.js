import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 登陆界面
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth/index.vue')
  },

  // 主体布局
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */'../layout/Basic/index.vue'),
    children: [

      // 需求列表界面
      {
        path: '/demands',
        name: 'DemandList',
        component: () => import(/* webpackChunkName: "DemandList" */'../views/DemandList/index.vue')
      },

      // 需求详情界面
      {
        path: '/demands/:id',
        name: 'DemandDetail',
        component: () => import(/* webpackChunkName: "DemandDetail" */'../views/DemandDetail/index.vue')
      },

      // 订单列表界面
      {
        path: '/orders',
        name: 'OrderList',
        component: () => import(/* webpackChunkName: "OrderList" */'../views/Order/index.vue')
      },

      // 订单详情界面
      {
        path: '/orders/:id',
        name: 'OrderDetail',
        component: () => import(/* webpackChunkName: "OrderDetail" */'../views/OrderDetail/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
