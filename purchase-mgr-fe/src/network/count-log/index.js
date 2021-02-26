import { get } from '@/helpers/request/index';

// 获取库存操作log
export const list = (stockId, type = 'IN_COUNT', page = 1) => {
  return get('/count-log/list', {
    stockId,
    type,
    page
  });
};
