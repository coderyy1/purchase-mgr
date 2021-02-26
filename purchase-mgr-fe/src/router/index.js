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
      },

      // 供应商列表界面
      {
        path: '/suppliers',
        name: 'SupplierList',
        component: () => import(/* webpackChunkName: "SupplierList" */'../views/SupplierList/index.vue')
      },

      // 供应商详情界面
      {
        path: '/suppliers/:id',
        name: 'SupplierDetail',
        component: () => import(/* webpackChunkName: "SupplierDetail" */'../views/SupplierDetail/index.vue')
      },

      // 报价比对界面
      {
        path: '/contrast',
        name: 'Contrast',
        component: () => import(/* webpackChunkName: "Contrast" */'../views/Contrast/index.vue')
      },

      // 库存信息界面
      {
        path: '/stocks',
        name: 'Stocks',
        component: () => import(/* webpackChunkName: "Stocks" */'../views/Stock/index.vue')
      },

      // 库存详情界面
      {
        path: '/stocks/:id',
        name: 'StocksDetail',
        component: () => import(/* webpackChunkName: "StocksDetail" */'../views/StockDetail/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
