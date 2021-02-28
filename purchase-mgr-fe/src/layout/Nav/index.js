import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  props: {
    url: String
  },
  setup(props) {

    const menu = [
      {
        title: '需求列表',
        url: '/demands'
      },
      {
        title: '已完成订单',
        url: '/orders'
      },
      {
        title: '供应商信息',
        url: '/suppliers'
      },
      {
        title: '报价对比',
        url: '/contrast'
      },
      {
        title: '库存管理',
        url: '/stocks'
      },
      {
        title: '用户管理',
        url: '/users'
      },
      {
        title: '邀请码管理',
        url: '/invite'
      },
    ]

    const selectedKeys = ref([]);

    const router = useRouter();
    const route = useRoute();
    const openKeys = ref([]);

    // 跳转方法
    const to = (url) => {
      router.push(url);
    }

    onMounted(() => {
      selectedKeys.value = [route.path];

      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });


    return {
      selectedKeys,
      menu,
      route,
      openKeys,

      to
    }
  }
});