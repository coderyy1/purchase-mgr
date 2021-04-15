import { defineComponent, reactive, watch, ref } from 'vue';
import { goods } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import moment from 'moment';


export default defineComponent({
  props: {
    isShow: Boolean,
    info:  Object
  },
  setup(props, context) {
    const updateForm = reactive({
      name: '',
      price: 0,
      place: '',
      unit: '个'
    });


    watch(() => props.info, (current) => {
      Object.assign(updateForm, current);
    });

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入货物名');

        return;
      }
      if(updateForm.price === '') {
        message.info('请输入报价');

        return;
      }
      if(updateForm.place === '') {
        message.info('请输入商品产地');

        return;
      }

      const form = clone(updateForm);

      // 发送请求
      const res = await goods.update(form);

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