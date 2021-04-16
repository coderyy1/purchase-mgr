import { defineComponent, computed } from 'vue';
import Nav from '../Nav/index.vue';
import { setToken } from '@/helpers/token';
import { useStore } from 'vuex';
import { Modal, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue'
import { result } from '@/helpers/utils';

export default defineComponent({
  components: {
    AppNav: Nav, UserOutlined
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const avatSrc = computed(() => {
      return store.state.userAvatSrc
    })



    //登出
    const logout = () => {
      Modal.confirm({
        title: '确认要登出吗?',
        cancelText: '取消',
        okText: '确认登出',
        onOk: () => {
          setToken('');

          router.replace('/auth');
        }
      });
    }


    const goHome = () => {
      router.replace('/demands');
    }

    const goProfile = () => {
      router.replace('/profile')
    }



    return {
      store,
      avatSrc,

      logout,
      goHome,
      goProfile
    }
  }
});