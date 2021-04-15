import { defineComponent, reactive, watch } from 'vue';
import { stock } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';


export default defineComponent({
  props: {
    isShow: Boolean,
    info:  Object,
  },
  setup(props, context) {
    const updateForm = reactive({
      name: '',
      storeName: ''
    });

    watch(() => props.info, (current) => {
      Object.assign(updateForm, current);
    });

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入名称');

        return;
      }

      const form = {
        id: updateForm._id,
        name: updateForm.name,
        storeName: updateForm.storeName
      };

      // 发送请求
      const res = await stock.update(form);

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
      })
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