import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import store from '@/store';
import { message } from 'ant-design-vue';
import { getToken } from '@/helpers/token/index';
import { user } from '@/network';

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
    redirect: '/auth',
    component: () => import(/* webpackChunkName: "BasicLayout" */'../layout/Basic/index.vue'),
    children: [

      // 需求列表界面
      {
        path: '/demands',
        name: 'DemandList',
        meta: {
          title: '',
          navUrl: '/demands'
        },
        component: () => import(/* webpackChunkName: "DemandList" */'../views/DemandList/index.vue')
      },

      // 需求详情界面
      {
        path: '/demands/details/:id',
        name: 'DemandDetail',
        meta: {
          title: '',
          navUrl: '/demands'
        },
        component: () => import(/* webpackChunkName: "DemandDetail" */'../views/DemandDetail/index.vue')
      },

      // 订单列表界面
      {
        path: '/orders',
        name: 'OrderList',
        meta: {
          title: '',
          navUrl: '/orders'
        },
        component: () => import(/* webpackChunkName: "OrderList" */'../views/Order/index.vue')
      },

      // 订单详情界面
      {
        path: '/orders/details/:id',
        name: 'OrderDetail',
        meta: {
          title: '',
          navUrl: '/orders'
        },
        component: () => import(/* webpackChunkName: "OrderDetail" */'../views/OrderDetail/index.vue')
      },

      // 供应商列表界面
      {
        path: '/suppliers',
        name: 'SupplierList',
        meta: {
          title: '',
          navUrl: '/suppliers'
        },
        component: () => import(/* webpackChunkName: "SupplierList" */'../views/SupplierList/index.vue')
      },

      // 供应商详情界面
      {
        path: '/suppliers/details/:id',
        name: 'SupplierDetail',
        meta: {
          title: '',
          navUrl: '/suppliers'
        },
        component: () => import(/* webpackChunkName: "SupplierDetail" */'../views/SupplierDetail/index.vue')
      },

      // 报价比对界面
      {
        path: '/contrast',
        name: 'Contrast',
        meta: {
          title: '',
          navUrl: '/contrast'
        },
        component: () => import(/* webpackChunkName: "Contrast" */'../views/Contrast/index.vue')
      },

      // 库存信息界面
      {
        path: '/stocks',
        name: 'Stocks',
        meta: {
          title: '',
          navUrl: '/stocks'
        },
        component: () => import(/* webpackChunkName: "Stocks" */'../views/Stock/index.vue')
      },

      // 库存详情界面
      {
        path: '/stocks/details/:id',
        name: 'StocksDetail',
        meta: {
          title: '',
          navUrl: '/stocks'
        },
        component: () => import(/* webpackChunkName: "StocksDetail" */'../views/StockDetail/index.vue')
      },

      // 用户管理界面
      {
        path: '/users',
        name: 'User',
        meta: {
          title: '',
          navUrl: '/users'
        },
        component: () => import(/* webpackChunkName: "User" */'../views/Users/index.vue')
      },

      // 邀请码管理界面
      {
        path: '/invite',
        name: 'Invite',
        meta: {
          title: '',
          navUrl: '/invite'
        },
        component: () => import(/* webpackChunkName: "Invite" */'../views/Invite/index.vue')
      },

      // 修改密码界面
      {
        path: '/profile',
        name: 'Profile',
        meta: {
          title: '',
          navUrl: '/profile'
        },
        component: () => import(/* webpackChunkName: "Profile" */'../views/Profile/index.vue')
      },

      // 默认界面
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '',
          navUrl: '/home'
        },
        component: () => import(/* webpackChunkName: "Profile" */'../views/Home/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

  // 目标不为详情页时，缓存清空
  // 目标为详情页时，缓存
  if(!to.path.includes('/details/') && !from.path.includes('/details/')) {
    // console.log('clear');
    store.commit('clearKeepComp')
  } else {
    // console.log('set');
    store.commit('setKeepComp')
  }


  // 获取权限列表
  if(!store.state.characterInfo.length) {
      await store.dispatch('getCharacterInfo');
    }

  // 登陆拦截
  if(to.path !== '/auth') {
    // if(!getToken()) {
    //   next('/auth');
    //   message.error('认证失败，请重新登录');
    //   return;
    // }
    
    let res = {};

    try {
      res = await user.info();
    } catch (e) {
      if (e.message.includes('code 401')) {
        res.code = 401;
      }
    }

    const { code } = res;

    if (code === 401) {
      message.error('认证失败，请重新登录');
      next('/auth');
      return;
    }
  }



  // 不能访问登陆页
  if(to.path === '/auth' && getToken()) {
      next('/home');
      return;
  }

  // 通过token获取用户信息 -> 只有不是从登陆页面来的才需要获取
  if(from.path !== '/auth' && !store.state.userInfo.account) {

    if(getToken()) {
      await store.dispatch('getUserInfo');
    }
  }

  // 获取用户头像
  if(from.path !== '/auth' && !store.state.userAvatSrc) {

    await store.dispatch('getuserAvatSrc')

  }

  if(to.path === '/users' || to.path === '/invite') {
    if(store.state.userCharacter.name !== 'admin') {
      next('/home');
      return;
    }
  }

  next();
});

export default router
