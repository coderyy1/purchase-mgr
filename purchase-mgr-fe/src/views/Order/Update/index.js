import { defineComponent, reactive, watch, ref } from 'vue';
import { order } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import moment from 'moment';


export default defineComponent({
  props: {
    isShow: Boolean,
    info:  Object,
    supplier: Array
  },
  setup(props, context) {
    const updateForm = reactive({
      name: '',
      supplier: '',
      orderId: '',
      money: 0
    });

    watch(() => props.info, (current) => {
      updateForm.orderId = ''
      Object.assign(updateForm, current);
      updateForm.supplier = updateForm.supplier._id;
    });

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入货物名称');

        return;
      }
      if(updateForm.supplier === '') {
        message.info('请选择供应商');

        return;
      }
      if(updateForm.money === '') {
        message.info('请输入金额');

        return;
      }

      const form = {
        id: updateForm._id,
        supplier: updateForm.supplier,
        orderId: updateForm.orderId,
        money: updateForm.money
      };

      // 发送请求
      const res = await order.update(form);

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