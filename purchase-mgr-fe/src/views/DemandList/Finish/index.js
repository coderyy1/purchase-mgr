import { defineComponent, reactive, watch, ref } from 'vue';
import { demand, order, goods } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import store from '@/store';

const defaultFormData = {
  name: '',
  num: 0,
  supplier: '',
  user: '',
  orderId: '',
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

    const supplierList = ref([]);

    // 获取供应商list
    const getSupplierList = async () => {
      const res = await goods.finSuppliers({name: props.info.name})
      result(res)
        .success(({data}) => {
          supplierList.value = data
        })
    }

    watch(() => props.info, async (current) => {
      addForm.id = props.info._id;
      addForm.name = props.info.name;
      addForm.supplier = ''
      maxCount.value = props.info.num;
      addForm.orderId = ''
      await getSupplierList()
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
        message.info('请选择供应商');

        return;
      }
      if(addForm.orderId === '') {
        message.info('请输入订单号');

        return;
      }
      if(addForm.money === '') {
        message.info('请输入订单金额');

        return;
      }

      const form = clone(addForm);
      form.user = store.state.userInfo._id;

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
      addForm.num = 0
      addForm.supplier = ''
      addForm.user = ''
      addForm.money = 0
      context.emit('update:isShow', false);
    }

    return {
      addForm,
      maxCount,
      submit,
      props,
      close,
      supplierList
    }
  }
});