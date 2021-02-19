import { defineComponent, ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import Add from './Add/index.vue';
// import Update from './Update/index.vue';
import { demand } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
// import { useStore } from 'vuex';



export default defineComponent({
  props: {
    simple: Boolean
  },
  components: {
    Add
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
        dataIndex: 'publisher'
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

    // const store = useStore();

    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showAdd = ref(false);
    const showUpdate = ref(false);

    // 要传给修改modal中的数据
    const currentDemandInof = ref({});

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    // const router = useRouter();

    const loading = ref(true);

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

    // 删除的底层方法
    const remove = async (item) => {

      // const { _id } = item;
      // const res = await book.deleteBook(_id);
      // result(res)
      //   .success((data) => {
      //     message.success(data.msg);

      //     getList();
      //   })
    }

    // 删除按钮方法
    const removeDemand = (item) => {
      Modal.confirm({
        title: '确认删除该采购需求吗？',
        okText: '确认',
        cancelText: '取消',
        onCancel() {},
        onOk(){
          remove(item);
        }
      })
    }

    

    // 修改的方法
    const updateDemand = (data) => {
      showUpdate.value = true;
      currentDemandInof.value = data;
    }

    // 跳转详情页面
    const gotoDetail = (data) => {
      
    }

    return {
      column,
      showAdd,
      list,
      keyword,
      formatTimestamp,
      showBack,
      currentPage,
      total,
      showUpdate,
      currentDemandInof,
      loading,
      simple: props.simple,



      setPage,
      updateList,
      search,
      back,
      removeDemand,
      updateDemand,
      gotoDetail
    }
  }
});