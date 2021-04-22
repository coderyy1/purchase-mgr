import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  props: {
    url: String
  },
  setup(props) {

    const menu = [
      {
        title: '总览',
        url: '/home',
        onlyAdmin: false
      },
      {
        title: '需求列表',
        url: '/demands',
        onlyAdmin: false
      },
      {
        title: '已完成订单',
        url: '/orders',
        onlyAdmin: false
      },
      {
        title: '供应商信息',
        url: '/suppliers',
        onlyAdmin: false
      },
      {
        title: '报价对比',
        url: '/contrast',
        onlyAdmin: false
      },
      {
        title: '库存管理',
        url: '/stocks',
        onlyAdmin: false
      },
      {
        title: '用户管理',
        url: '/users',
        onlyAdmin: true
      },
      {
        title: '注册码管理',
        url: '/invite',
        onlyAdmin: true
      },
      {
        title: '我的档案',
        url: '/profile',
        onlyAdmin: false
      },
      
    ]


    const router = useRouter();
    const route = useRoute();
    const openKeys = ref([]);

    const keys = ref([]);


    const navWrap = ref()

    // 跳转方法
    const to = (url) => {
      router.push(url);
    }


    watch(() => route.path, (current) => {
      keys.value = [route.meta.navUrl];
    });

    onMounted(() => {
      keys.value = [route.meta.navUrl];

      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });


    return {
      menu,
      route,
      openKeys,
      keys,

      to,
    }
  }
});