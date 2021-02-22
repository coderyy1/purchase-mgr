import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Update from './Update/index.vue';
import { demand, order } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
// import { useStore } from 'vuex';



export default defineComponent({
  props: {
    simple: Boolean
  },
  components: {
    Update
  },
  setup(props) {
    const column = [
      {
        title: '货物名',
        dataIndex: 'name',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '供应商',
        dataIndex: 'supplier',
      },
      {
        title: '操作者',
        dataIndex: 'user',
      },
      {
        title: '添加时间',
        slots: {
          customRender: 'time'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      }
    ];


    // 订单list信息
    const list = ref([]);

    const total = ref(0);

    // const store = useStore();

    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showUpdate = ref(false);

    // 要传给修改modal中的数据
    const currentDemandInfo = ref({});

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    const router = useRouter();

    const loading = ref(true);

    // 请求List
    const getList = async () => {
      loading.value = true;
      const res = await order.list({
        page: currentPage.value,
        keyword: keyword.value
      });

      result(res)
        .success(({ data }) => {
          const {
            list: l,
            total: t
          } = data;
          list.value = l;
          total.value = t;

          loading.value = false;
        });
    }

    // 获取需求list
    onMounted(async () => {
      getList();
    });

    // 更新需求List
    const updateList = () => {
      getList();
    };

    // 切页方法
    const setPage = (page) => {
      currentPage.value = page;

      getList();
    };

    // 搜索的方法
    const search = () => {
      currentPage.value = 1;
      getList();
      showBack.value = Boolean(keyword.value);
    }

    // 返回
    const back = () => {
      keyword.value = '';
      search();
      showBack.value = false;
    }

    // 删除方法
    const removeOrder = (item) => {
      Modal.confirm({
        title: '确认删除该订单吗？',
        okText: '确认',
        cancelText: '取消',
        onCancel() {},
        onOk: async () => {
          const { _id } = item;
          const res = await order.deleteOrder(_id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            })
        }
      })
    }

    

    // 修改的方法
    const updateOrder = (data) => {
      showUpdate.value = true;
      currentDemandInfo.value = data;
    }


    // 跳转详情页面
    const goToDetail = (data) => {
      router.push({
        path: `/orders/${data._id}`
      });
    }

    return {
      column,
      list,
      keyword,
      formatTimestamp,
      formatTimestamp2,
      showBack,
      currentPage,
      total,
      showUpdate,
      currentDemandInfo,
      loading,
      simple: props.simple,



      setPage,
      updateList,
      search,
      back,
      removeOrder,
      updateOrder,
      goToDetail
    }
  }
});