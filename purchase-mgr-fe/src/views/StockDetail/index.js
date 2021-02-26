import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { stock, countLog } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../Stock/Update/index.vue';

export default defineComponent({
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const showUpdate = ref(false);

    const stockInfo = ref({});
    const logInfo = ref([]);

    const total = ref(0);

    const currentPage = ref(1);

    const createdAt = ref('');
    const updatedAt = ref('');

    const topLoading = ref(true);
    const bottomLoading = ref(true);

    const logFlag = ref('IN_COUNT');

    const column = [
      {
        title: '操作',
        slots: {
          customRender: 'type'
        }
      },
      {
        title: '数量',
        dataIndex: 'num'
      },
      {
        title: '操作者',
        dataIndex: 'user'
      },
      {
        title: '操作时间',
        slots: {
          customRender: 'createdAt'
        }
      }
    ]

    // 获取库存信息的方法
    const getData = async () => {
      topLoading.value = true;
      const res = await stock.detail(id);
      result(res)
        .success(({data}) => {
          stockInfo.value = data;
          createdAt.value = data.meta.createdAt;
          updatedAt.value = data.meta.updatedAt;

          topLoading.value = false;
        });
    }

    // 获取出入库日志的方法
    const getLogInfo = async () => {
      bottomLoading.value = true;
      const res = await countLog.list(id, logFlag.value, currentPage.value
      );
      result(res)
        .success((data) => {
          logInfo.value = data.list;
          total.value = data.total;

          bottomLoading.value = false;
        });
    }

    // 切页功能
    const setPage = (page) => {
      currentPage.value = page;

      getLogInfo();
    }

    onMounted( async () => {
      await getData();
      await getLogInfo();
    });

    // 删除的方法
    const removeStock = async () => {
      Modal.confirm({
        title: '确认删除库存信息吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await stock.deleteStock(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              router.replace('/stocks');
            });
        }
      });
    }

    // 筛选日志类型
    const toggleFlag = (type) => {
      logFlag.value = type;
      currentPage.value = 1;
      getLogInfo();
    }

    // 返回列表
    const back = () => {
      router.replace('/stocks');
    }


    return {
      id,
      s: stockInfo,
      formatTimestamp,
      showUpdate,
      logInfo,
      total,
      currentPage,
      column,
      logFlag,
      topLoading,
      bottomLoading,
      createdAt,
      updatedAt,


      toggleFlag,
      setPage,
      removeStock,
      getData,
      back
    }
  }
});