import { defineComponent, reactive, watch, ref } from 'vue';
import { supplier } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';


export default defineComponent({
  props: {
    isShow: Boolean,
    info:  Object
  },
  setup(props, context) {
    const updateForm = reactive({
      name: '',
      email: '',
      tel: '',
      address: '',
      contacts: ''
    });

    watch(() => props.info, (current) => {
      Object.assign(updateForm, current);
    });

    // 邮箱正则
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入供应商名称');

        return;
      }
      if(updateForm.email === '') {
        message.info('请输入邮箱');

        return;
      }
      if(!reg.test(updateForm.email)) {
        message.info('请输入正确的邮箱');

        return;
      }
      if(updateForm.tel === '') {
        message.info('请输入联系方式');

        return;
      }
      if(updateForm.address === '') {
        message.info('请输入地址');

        return;
      }
      if(updateForm.contacts === '') {
        message.info('请输入联系人');

        return;
      }

      const form = {
        id: updateForm._id,
        name: updateForm.name,
        email: updateForm.email,
        tel: updateForm.tel,
        address: updateForm.address,
        contacts: updateForm.contacts
      };

      // 发送请求
      const res = await supplier.update(form);

      // 处理结果
      result(res)
      // 成功
        .success((data) => {
          // 提示成功
          message.success(data.msg);
          // 更新list
          context.emit('updateList');
          // 关闭modal
          close();
        });
    }

    // 改变父组件传来的值
    const close = () => {
      context.emit('update:isShow', false);
    }

    return {
      updateForm,
      props,
      submit,
      close
    }
  }
});