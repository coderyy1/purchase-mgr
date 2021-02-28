import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { message } from 'ant-design-vue';
import { getToken } from '@/helpers/token/index';

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
      },

      // 用户管理界面
      {
        path: '/users',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */'../views/Users/index.vue')
      },

      // 邀请码管理界面
      {
        path: '/invite',
        name: 'Invite',
        component: () => import(/* webpackChunkName: "Invite" */'../views/Invite/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {



  // 获取权限列表
  if(!store.state.characterInfo.length) {
      await store.dispatch('getCharacterInfo');
    }

  // 登陆拦截
  if(to.path !== '/auth') {
    if(!getToken()) {
      next('/auth');
      message.error('认证失败，请重新登录');
      return;
    }
  }



  // 不能访问登陆页
  if(to.path === '/auth' && getToken()) {
      next('/demands');
      return;
  }

  // 通过token获取用户信息 -> 只有不是从登陆页面来的才需要获取
  if(from.path !== '/auth' && !store.state.userInfo.account) {

    if(getToken()) {
      await store.dispatch('getUserInfo');
    }
  }

  next();
});

export default router
