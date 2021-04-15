import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Add from './Add/index.vue';
import Update from './Update/index.vue';
import { stock } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
import { useStore } from 'vuex';


export default defineComponent({
  name: 'Stocks',
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
        title: '库存',
        slots: {
          customRender: 'count'
        },
        width: '180px'
      },
      {
        title: '仓库',
        slots: {
          customRender: 'storeName'
        }
      },
      {
        title: '添加日期',
        slots: {
          customRender: 'addDate'
        },
      },,
      {
        title: '上一次修改',
        slots: {
          customRender: 'updateDate'
        },
      },
    ];

    if(!props.simple) {
      column.push(
        {
          title: '操作',
          slots: {
            customRender: 'actions'
          },
          width: '220px'
        });
    }

    // list信息
    const list = ref([]);

    const total = ref(0);

    const store = useStore();

    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showAdd = ref(false);
    const showUpdate = ref(false);

    // 要传给修改modal中的数据
    const currentInof = ref({});

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    const router = useRouter();

    const loading = ref(true);

    // 请求List
    const getList = async () => {
      loading.value = true;
      const res = await stock.list({
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


    // 切页方法
    const setPage = (page) => {
      currentPage.value = page;

      getList();
      // window.scrollTo(0, 0)
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
    const removeStock = (item) => {
      Modal.confirm({
        title: '确认删除库存信息吗？',
        okText: '确认',
        cancelText: '取消',
        onCancel() {},
        onOk: async () => {
          const { _id } = item;
          const res = await stock.deleteStock(_id);
          result(res)
            .success((data) => {
              message.success(data.msg);

              getList();
            })
        }
      })
    }

    // 显示入库出库弹窗
    const editCount = (type, data) => {

      let word = '增加';
      if(type === 'OUT_COUNT') {
        word = '减少';
      }

      Modal.confirm({
        title: `要${word}多少库存?`,
        content: (
          <div>
            <Input class="__stock_count" />
          </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const el = document.querySelector('.__stock_count');

          const res = await stock.count({
            id: data._id,
            type,
            num: el.value,
            user: store.state.userInfo._id
          });

          result(res)
            .success(() => {
              message.success(`成功${word}${el.value}个  '  ${data.name}  '`);
              getList();
            });
        }
      });
    }

    // 修改的方法
    const updateStock = (data) => {
      showUpdate.value = true;
      currentInof.value = data;

    }

    // 跳转详情页面
    const gotoDetail = (data) => {
      router.push({
        path: `/stocks/details/${data._id}`
      });
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
      currentInof,
      loading,
      simple: props.simple,



      setPage,
      search,
      back,
      removeStock,
      editCount,
      updateStock,
      gotoDetail,
      getList
    }
  }
});