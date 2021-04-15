import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { order, supplier } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../Order/Update/index.vue';

export default defineComponent({
  name: 'OrderDetail',
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const supplierInfo = ref([]);

    const showUpdate = ref(false);

    const orderInfo = ref({});

    const topLoading = ref(true);

    const createdAt = ref('');

    const supplierName = ref('');
    const userName = ref('');

    // 获取订单信息的方法
    const getData = async (id) => {
      topLoading.value = true;
      const res = await order.detail(id);
      result(res)
        .success(({data}) => {
          orderInfo.value = data;
          createdAt.value = data.meta.createdAt;
          supplierName.value = data.supplier.name;
          userName.value = data.user.account;

          topLoading.value = false;
        });
    }

    //获取供应商列表的方法
    const getSupplierList = async () => {
      const res = await supplier.listAll();
      result(res)
        .success((data) => {
          supplierInfo.value = data.data.list;
        });
    }



    onMounted( async () => {
      await getData(id);
      await getSupplierList();
    });

    // 删除订单的方法
    const removeOrder = async () => {
      Modal.confirm({
        title: '确认删除该订单吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await order.deleteOrder(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              router.replace('/orders');
            });
        }
      });
    }

    // 返回方法
    const back = () => {
      router.back();
    }

    // 前往需求详情的方法
    const goDemandDetail = () => {
      router.push({
        path: `/demands/details/${orderInfo.value.demandId}`
      });
    }

    return {
      id,
      o: orderInfo,
      formatTimestamp,
      formatTimestamp2,
      createdAt,
      supplierName,
      supplierInfo,
      userName,
      showUpdate,
      topLoading,
      
      removeOrder,
      getData,
      back,
      goDemandDetail
    }
  }
});