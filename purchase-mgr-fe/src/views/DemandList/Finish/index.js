import { defineComponent, reactive, watch, ref } from 'vue';
import { demand, order } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const defaultFormData = {
  name: '',
  num: 0,
  supplier: '',
  user: '',
  money: 0,
};

export default defineComponent({
  props: {
    isShow: Boolean,
    info: Object
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));
    const maxCount = ref(99999999);

    watch(() => props.info, (current) => {
      addForm.id = props.info._id;
      addForm.name = props.info.name;
      maxCount.value = props.info.num;
    });

    const submit = async () => {

      // 表单校验
      if(addForm.name === '') {
        message.info('请输入货物名');

        return;
      }
      if(addForm.num === '') {
        message.info('请输入数量');

        return;
      }
      if(addForm.supplier === '') {
        message.info('请输入供应商名称');

        return;
      }
      if(addForm.money === '') {
        message.info('请输入订单金额');

        return;
      }

      const form = clone(addForm);

      // 发送请求
      const res = await order.add(form);

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
      maxCount,
      submit,
      props,
      close
    }
  }
});