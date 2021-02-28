import { defineComponent, reactive, ref } from 'vue';
import { UserOutlined, DisconnectOutlined, LockOutlined } from '@ant-design/icons-vue';
import { auth } from '@/network';
import { message, Modal, Input } from 'ant-design-vue';
import { result } from '../../helpers/utils/index';
import store from '@/store';
import { useRouter } from 'vue-router';
import { setToken, getToken } from '@/helpers/token/index';
import { getCharacterInfoById } from '@/helpers/character';
import axios from 'axios';


export default defineComponent({
  components: {
    UserOutlined, DisconnectOutlined, LockOutlined
  },
  setup() {
    // 注册的表单
    const regForm = reactive({
      account: '',
      password: '',
      subPwd: '',
      inviteCode: ''
    });

    const router = useRouter();

    // 登陆的表单
    const logForm = reactive({
      account: '',
      password: ''
    });

    // tabs的活跃页码
    const currentTab = ref('1');

    // 注册的逻辑
    const register = async () => {

      // 表单校验
      if(regForm.account === '') {
        message.info('请输入用户名');
        return;
      }

      if(regForm.password === '') {
        message.info('请输入密码');
        return;
      }

      if(regForm.password.length < 6 || regForm.password.length > 12) {
        message.error('密码长度为6~12位');
        return;
      }

      if(regForm.subPwd !== regForm.password) {
        message.info('两次输入的密码不统一');
        return;
      }

      if(regForm.inviteCode === '') {
        message.error('请输入邀请码');
        return;
      }

      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);

      result(res)
        .success((data) => {
          message.success(data.msg);
          // 重置注册表单
          // regForm.account = '';
          // regForm.password = '';
          // regForm.subPwd = '';
          // regForm.inviteCode = '';
          // 注册成功自动跳转登录界面
          logForm.account = regForm.account;
          logForm.password = regForm.password;
          currentTab.value = '1';
        });
    }

    // 登录的逻辑
    const login = async () => {

      // 表单校验
      if(logForm.account === '') {
        message.info('请输入用户名');
        return;
      }

      if(logForm.password === '') {
        message.info('请输入密码');
        return;
      }

      const res = await auth.login(logForm.account, logForm.password);

      result(res)
        .success((data) => {
          message.success(data.data.user.account + data.msg);
          // 存储用户信息 -> vuex
          store.commit('setUserInfo', data.data.user);
          store.commit('setUserCharacter', getCharacterInfoById(data.data.user.character._id));
          // 存储token -> sessionStorage
          setToken(data.data.token);

          // 更新axios请求头内容
          axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

          router.replace('/demands')
        });
    }

    // 忘记密码的方法
    const resetPwd = () => {
      Modal.confirm({
        title: '请输入要重置密码的账号。',
        okText: '确认',
        cancelText: '取消',
        content: (
          <div>
            <Input class="__book_input_count" />
          </div>
        ),
        onOk: async () => {
          // const el = document.querySelector('.__book_input_count');

          // const res = await reset.add({
          //   account: el.value
          // });
          // result(res)
          //   .success(() => {
          //     message.success('申请成功');
          //   });

          console.log('请求成功');
        }

      });
    }

    return {
      regForm,
      logForm,
      currentTab,
      register,
      login,
      resetPwd
    }
  }
});