import { defineComponent, reactive, ref } from 'vue';
import { demand } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';

const defaultFormData = {
  name: '',
  num: 0,
  endTime: ''
};

export default defineComponent({
  props: {
    isShow: Boolean
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {

      // 表单校验
      if(addForm.name === '') {
        message.info('请输入货物名');

        return;
      }
      if(addForm.num === '') {
        message.info('请输入需求数量');

        return;
      }
      if(addForm.endTime === '') {
        message.info('请选择截止日期');

        return;
      }

      const form = clone(addForm);
      form.endTime = addForm.endTime.valueOf();
      form.publisher = store.state.userInfo._id;

      // 发送请求
      const res = await demand.add(form);

      // 处理结果
      result(res)
      // 成功
      .success((data) => {
        // 重置表单
        Object.assign(addForm, defaultFormData);
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
    }
  }
});