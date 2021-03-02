import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supplier, goods } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../SupplierList/Update/index.vue';
import Add from './Add/index.vue';
import UpdateGoods from './UpdateGoods/index.vue';
import store from '@/store';

export default defineComponent({
  components: {
    Update, Add, UpdateGoods
  },
  setup() {
    const column = [
      {
        title: '货物名',
        dataIndex: 'name',
      },
      {
        title: '产地',
        dataIndex: 'place',
      },
      {
        title: '报价(每个)',
        dataIndex: 'price',
      },
      
    ]

    if(store.state.userCharacter.name === 'admin') {
      column.push(
        {
          title: '操作',
          slots: {
            customRender: 'actions'
          },
          width: '160px'
        }
      );
    }

    const list = ref([]);

    const currentPage = ref(1);
    const total = ref(0);


    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const showUpdate = ref(false);
    const showUpdateGoods = ref(false);
    const showAdd = ref(false);

    const currentGoodsInfo = ref();

    const supplierInfo = ref({});

    const topLoading = ref(true);
    const bottomLoading = ref(true);

    const keyword = ref('');

    // 获取详细信息的方法
    const getData = async (id) => {
      topLoading.value = true;
      const res = await supplier.detail(id);
      result(res)
        .success(({data}) => {
          supplierInfo.value = data;

          topLoading.value = false;
        });
    }

    // 获取提供货物信息的方法
    const getGoodsList = async () => {
      bottomLoading.value = true;
      const res = await goods.supplierList({
        id,
        page: currentPage.value,
        keyword: keyword.value
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
      getGoodsList();
    }


    onMounted( async () => {
      await getData(id);
      await getGoodsList();
    });

    // 删除供应商的方法
    const removeSupplier = async () => {
      Modal.confirm({
        title: '确认删除该供应商吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await supplier.deleteSupplier(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              router.replace('/suppliers');
            });
        }
      });
    }

    // 添加供货信息的方法
    const addGoods = () => {
      showAdd.value = true;
    }

    // 修改供货信息的方法
    const updateGoods = (data) => {
      showUpdateGoods.value = true;
      currentGoodsInfo.value = data;
    }

    // 删除供货信息的方法
    const removeGoods = async (goodsId) => {
      Modal.confirm({
        title: '确认删除该供货信息吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await goods.deleteGoods(goodsId);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getGoodsList();
            });
        }
      });
    }

    // 返回的方法
    const back = () => {
      router.replace({
        path: '/suppliers'
      });
    }

    return {
      id,
      s: supplierInfo,
      column,
      list,
      currentPage,
      total,
      bottomLoading,
      keyword,
      formatTimestamp,
      formatTimestamp2,
      showUpdate,
      topLoading,
      showAdd,
      showUpdateGoods,
      currentGoodsInfo,
      
      setPage,
      back,
      removeSupplier,
      getData,
      addGoods,
      getGoodsList,
      removeGoods,
      updateGoods
    }
  }
});