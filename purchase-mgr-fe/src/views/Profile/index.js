import { defineComponent, ref } from 'vue';
import { profile } from '@/network';
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils';
import { setToken } from '@/helpers/token';
import { useRouter } from 'vue-router';
import store from '@/store'

import UploadImg from '@/components/UploadImg/index.vue'

export default defineComponent({
  name: 'Profile',
  components: {
    UploadImg
  },
  setup() {
    const oldPwd = ref('');
    const newPwd = ref('');
    const submiPwd = ref('');
    const key = ref('');

    const router = useRouter();

    const updatePwd = async () => {
      // 校验
      if(oldPwd.value === '') {
        message.error('请输入原密码');
        return;
      }
      if(newPwd.value === '') {
        message.error('请输入新密码');
        return;
      }
      if(newPwd.value.length < 6 || newPwd.value.length > 12) {
        message.error('密码为6~12位');
        return;
      }
      if(submiPwd.value !== newPwd.value) {
        message.error('两次输入的密码不一致');
        return;
      }
      if(key.value === '') {
        message.error('请输入密钥');
        return;
      }


      // 请求
      const res = await profile.update({
        newPassword: newPwd.value,
        oldPassword: oldPwd.value,
        key: key.value
      });
      result(res)
        .success( async (data) => {
          oldPwd.value = '';
          newPwd.value = '';
          submiPwd.value = '';
          key.value = '';
          await message.success(`修改成功，即将登出。`);
          logout();
        });
    }

    // 登出
    const logout = () => {
      setToken('');
      router.replace('/auth');
    }

    return {
      oldPwd,
      newPwd,
      submiPwd,
      key,
      store,

      updatePwd,
      logout
    }
  }


});