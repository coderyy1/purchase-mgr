import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Add from './Add/index.vue';
import Update from './Update/index.vue';
import { supplier } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
// import { useStore } from 'vuex';



export default defineComponent({
  name: 'SupplierList',
  props: {
    simple: Boolean
  },
  components: {
    Add, Update
  },
  setup(props) {
    const column = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '联系方式',
        dataIndex: 'tel',
      },
      {
        title: '联系人',
        dataIndex: 'contacts',
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        },
        width: '220px'
      }
    ];


    // 供应商list信息
    const list = ref([]);

    const total = ref(0);

    // const store = useStore();

    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showAdd = ref(false);
    const showUpdate = ref(false);

    // 要传给修改modal中的数据
    const currentInfo = ref({});

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    const router = useRouter();

    const loading = ref(true);

    // 请求List
    const getList = async () => {
      loading.value = true;
      const res = await supplier.list({
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

    // 获取list
    onMounted(async () => {
      getList();
    });

    // 更新List
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
    const removeSupplier = (item) => {
      Modal.confirm({
        title: '确认删除该供应商信息吗？',
        okText: '删除',
        cancelText: '取消',
        onCancel() {},
        onOk: async () => {
          const { _id } = item;
          const res = await supplier.deleteSupplier(_id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            })
        }
      })
    }

    

    // 修改的方法
    const updateSupplier = (data) => {
      showUpdate.value = true;
      currentInfo.value = data;
    }

    // 跳转详情页面
    const goToDetail = (data) => {
      router.push({
        path: `/suppliers/details/${data._id}`
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
      currentInfo,
      loading,
      simple: props.simple,



      setPage,
      updateList,
      search,
      back,
      removeSupplier,
      updateSupplier,
      goToDetail,
    }
  }
});