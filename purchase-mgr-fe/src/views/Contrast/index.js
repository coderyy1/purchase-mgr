import { defineComponent, ref, onMounted } from 'vue';
import { goods } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
// import { useStore } from 'vuex';



export default defineComponent({
  props: {
    simple: Boolean
  },
  components: {
    
  },
  setup(props) {
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
        title: '报价',
        dataIndex: 'price',
        sortDirections: ['descend'],
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: '供应商名称',
        slots: {
          customRender: 'supplier'
        }
      },
      {
        title: '供应商联系人',
        slots: {
          customRender: 'contacts'
        }
      },
      {
        title: '供应商联系方式',
        slots: {
          customRender: 'tel'
        }
      }
    ];


    // 供货list信息
    const list = ref([]);

    const total = ref(0);

    // const store = useStore();

    // 当前页数
    const currentPage = ref(1);

    const sortType = ref('ascend');

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    const loading = ref(true);

    // 请求List
    const getList = async () => {
      loading.value = true;
      const res = await goods.list({
        page: currentPage.value,
        keyword: keyword.value,
        type: sortType.value
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

    // 排序切换的方法
    const toggleSort = () => {
      sortType.value = sortType.value === 'ascend' ? 'descend' : 'ascend';
      getList();
    }


    onMounted(async () => {
      await getList();
    });

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

    return {
      column,
      list,
      keyword,
      formatTimestamp,
      formatTimestamp2,
      showBack,
      currentPage,
      total,
      loading,
      simple: props.simple,
      sortType,



      setPage,
      search,
      back,
      toggleSort
    }
  }
});