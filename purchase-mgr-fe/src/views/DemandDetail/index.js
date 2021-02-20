import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { demand } from '@/network';
import { result, formatTimestamp, formatTimestamp2 } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../DemandList/Update/index.vue';

export default defineComponent({
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const showUpdate = ref(false);

    const demandInfo = ref({});

    const topLoading = ref(true);

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


    onMounted( async () => {
      await getData(id);
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

    return {
      id,
      d: demandInfo,
      formatTimestamp,
      formatTimestamp2,
      createdAt,
      removeDemand,
      getData,
      showUpdate,
      topLoading,
      back
    }
  }
});