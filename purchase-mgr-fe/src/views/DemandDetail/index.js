import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { demand, order } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../DemandList/Update/index.vue';

export default defineComponent({
  components: {
    Update
  },
  setup() {
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
    ]

    const list = ref([]);

    const currentPage = ref(1);
    const total = ref(0);


    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const showUpdate = ref(false);

    const demandInfo = ref({});

    const topLoading = ref(true);
    const bottomLoading = ref(true);

    const createdAt = ref('');

    // 获取需求信息的方法
    const getData = async (id) => {
      topLoading.value = true;
      const res = await demand.detail(id);
      result(res)
        .success(({data}) => {
          demandInfo.value = data;
          createdAt.value = data.meta.createdAt;

          topLoading.value = false;
        });
    }

    // 获取订单信息的方法
    const getOrderList = async () => {
      bottomLoading.value = true;
      const res = await order.listById({
        id,
        page: currentPage.value
      });

      result(res)
        .success((data) => {
          list.value = data.data.list;
          total.value = data.data.total;

          bottomLoading.value = false;
        });
    }

    // 切页的方法
    const setPage = (page) => {
      currentPage.value = page;
      getOrderList();
    }


    onMounted( async () => {
      await getData(id);
      await getOrderList();
    });

    // 删除需求的方法
    const removeDemand = async () => {
      Modal.confirm({
        title: '确认删除该需求吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await demand.deleteDemand(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              router.replace('/demands');
            });
        }
      });
    }

    // 返回需求列表的方法
    const back = () => {
      router.replace({
        path: '/demands'
      });
    }

    // 前往订单详情的方法
    const goOrderDetail = (data) => {
      router.push({
        path: `/orders/${data._id}`
      });
    }

    return {
      id,
      d: demandInfo,
      column,
      list,
      currentPage,
      total,
      bottomLoading,
      setPage,
      formatTimestamp,
      formatTimestamp2,
      createdAt,
      removeDemand,
      getData,
      showUpdate,
      topLoading,
      back,
      goOrderDetail
    }
  }
});