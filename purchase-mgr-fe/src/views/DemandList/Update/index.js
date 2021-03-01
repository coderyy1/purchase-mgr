import { defineComponent, reactive, watch, ref } from 'vue';
import { demand } from '@/network/index';
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
      num: 0,
      endTime: '',
      state: 1
    });

    const finishNum = ref(0);

    watch(() => props.info, (current) => {
      Object.assign(updateForm, current);
      updateForm.endTime = moment(Number(updateForm.endTime));
      finishNum.value = props.info.finishNum;
    });

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入货物名称');

        return;
      }
      if(updateForm.num === '') {
        message.info('请输入需求数量');

        return;
      }
      if(updateForm.endTime === '') {
        message.info('请选择截止日期');

        return;
      }
      if(updateForm.state === '') {
        message.info('请选择状态');

        return;
      }

      const form = {
        id: updateForm._id,
        name: updateForm.name,
        num: updateForm.num,
        endTime: updateForm.endTime,
        state: updateForm.state,
        finishNum: finishNum.value
      };
      form.endTime = updateForm.endTime.valueOf();

      // 发送请求
      const res = await demand.update(form);

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