import { defineComponent, reactive, ref } from 'vue';
import { supplier } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import options from '@/helpers/cities.js'

const defaultFormData = {
  name: '',
  email: '',
  tel: '',
  contacts: '',
  address: ''
};

export default defineComponent({
  props: {
    isShow: Boolean
  },
  setup(props, context) {


    const addForm = reactive(clone(defaultFormData));
    const cascaderValue = ref([])

    // 邮箱正则
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

    const submit = async () => {

      // 表单校验
      if(addForm.name === '') {
        message.info('请输入供应商名称');

        return;
      }
      if(addForm.email === '') {
        message.info('请输入邮箱');

        return;
      }
      if(!reg.test(addForm.email)) {
        message.info('请输入正确的邮箱');

        return;
      }
      if(addForm.tel === '') {
        message.info('请输入联系方式');

        return;
      }
      if(cascaderValue.value.length === 0) {
        message.info('请输入地址');

        return;
      }
      if(addForm.contacts === '') {
        message.info('请输入联系人');

        return;
      }

      const form = clone(addForm);
      form.address = cascaderValue.value.join('')

      // 发送请求
      const res = await supplier.add(form);

      // 处理结果
      result(res)
      // 成功
      .success((data) => {
        // 重置表单
        Object.assign(addForm, defaultFormData);
        cascaderValue.value = []
        // 提示成功
        message.success(data.msg);
        // 更新list
        context.emit('updateList');
        // 关闭modal
        close();
      })
    }

    // 改变父组件传来的值
    const close = () => {
      context.emit('update:isShow', false);
    }

    return {
      addForm,
      submit,
      props,
      close,
      options,
      cascaderValue
    }
  }
});