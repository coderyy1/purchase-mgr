import { defineComponent, ref, onMounted } from 'vue';
import { invite } from '@/network';
import { result } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';

export default defineComponent({
  setup() {
    const column = [
      {
        title: '邀请码',
        dataIndex: 'code',
      },
      {
        title: '权限',
        slots: {
          customRender: 'chara'
        }
      },
      {
        title: '使用状态',
        slots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      }
    ]

    const list = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const loading = ref(true);

    const count = ref('');

    const currentCharacter = ref(store.state.characterInfo[1]._id);

    // 获取列表的方法
    const getList = async () => {
      loading.value = true;
      const res = await invite.list(currentPage.value, 5);
      result(res)
        .success((data) => {
          list.value = data.data;
          total.value = data.total;
          loading.value = false;
        });
    }

    // 切页的方法
    const setPage = (page) => {
      currentPage.value = page;
      getList();
    }

    // 添加的方法
    const addCode = async () => {
      if(!count.value) {
        return;
      }

      const res = await invite.add({ 
        count: count.value,
        type: currentCharacter.value
       });
      result(res)
        .success((data) => {
          message.success(data.msg);
        });

      count.value = '';

      getList();
    }

    // 删除的方法
    const removeCode = (id) => {
      Modal.confirm({
        title: '确认删除该邀请码吗?',
        cancelText: '取消',
        okText: '确认删除',
        onOk: async () => {
          const res = await invite.remove(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            });
        }
      });
    }


    onMounted(() => {
      getList();
    });


    return {
      column,
      list,
      currentPage,
      total,
      loading,
      count,
      currentCharacter,
      characterInfo: store.state.characterInfo,

      getList,
      setPage,
      addCode,
      removeCode,
      getCharacterInfoById
    }
  }
});