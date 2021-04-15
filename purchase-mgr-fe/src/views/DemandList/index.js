import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Add from './Add/index.vue';
import Update from './Update/index.vue';
import Finish from './Finish/index.vue';
import { demand, order, supplier } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';



export default defineComponent({
  name: 'DemandList',
  props: {
    simple: Boolean
  },
  components: {
    Add, Update, Finish
  },
  setup(props) {
    const column = [
      {
        title: '货物名',
        dataIndex: 'name',
      },
      {
        title: '需求数量',
        dataIndex: 'num',
      },
      {
        title: '完成数量',
        dataIndex: 'finishNum',
      },
      {
        title: '状态',
        slots: {
          customRender: 'state'
        }
      },
      {
        title: '发布日期',
        slots: {
          customRender: 'startTime'
        }
      },
      {
        title: '截止日期',
        slots: {
          customRender: 'endTime'
        }
      },
      {
        title: '发布者',
        slots: {
          customRender: 'publisher'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      }
    ];


    // 采购需求list信息
    const list = ref([]);

    const total = ref(0);

    // 供应商列表
    const supplierInfo = ref([]);


    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showAdd = ref(false);
    const showUpdate = ref(false);
    const showFinish = ref(false);

    // 要传给修改modal中的数据
    const currentDemandInfo = ref({});

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    const router = useRouter();

    const loading = ref(true);


    // 获取供应商信息
    const getSupplierList = async () => {
      const res = await supplier.listAll();
      result(res)
        .success((data) => {
          supplierInfo.value = data.data.list;
        });
    }

    // 请求List
    const getList = async () => {
      loading.value = true;
      const res = await demand.list({
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
      await getList();
      await getSupplierList();
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
    const removeDemand = (item) => {
      Modal.confirm({
        title: '确认删除该采购需求吗？',
        okText: '确认',
        cancelText: '取消',
        onCancel() {},
        onOk: async () => {
          const { _id } = item;
          const res = await demand.deleteDemand(_id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            })
        }
      })
    }

    

    // 修改的方法
    const updateDemand = (data) => {
      showUpdate.value = true;
      currentDemandInfo.value = data;
    }

    //完成订单的方法
    const finishDemand = (data) => {
      showFinish.value = true;
      currentDemandInfo.value = data;
    }

    // 跳转详情页面
    const goToDetail = (data) => {
      router.push({
        path: `/demands/details/${data._id}`
      });
    }

    return {
      column,
      showAdd,
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
      showFinish,
      supplierInfo,



      setPage,
      updateList,
      search,
      back,
      removeDemand,
      updateDemand,
      goToDetail,
      finishDemand
    }
  }
});