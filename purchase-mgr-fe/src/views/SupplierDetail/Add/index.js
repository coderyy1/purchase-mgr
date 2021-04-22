import { defineComponent, reactive, ref } from 'vue';
import { goods } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import options from '@/helpers/cities.js'

const defaultFormData = {
  name: '',
  price: 0,
  place: '',
  unit: '个'
};

export default defineComponent({
  props: {
    isShow: Boolean,
    id: String
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));
    const cascaderValue = ref([])

    const submit = async () => {

      // 表单校验
      if(addForm.name === '') {
        message.info('请输入货物名');

        return;
      }
      if(addForm.price === '') {
        message.info('请输入报价');

        return;
      }
      if(cascaderValue.value.length === 0) {
        message.info('请输入商品产地');

        return;
      }

      const form = clone(addForm);
      form.id = props.id;
      form.place = cascaderValue.value.join('')

      // 发送请求
      const res = await goods.add(form);

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