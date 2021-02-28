import { del, get } from '@/helpers/request/index';

// 邀请码列表查询的请求
export const list = (page, size) => {
  return get('/invite/list', {
    page,
    size
  });
};

export const add = (data) => {
  return get('/invite/add', data);
}

export const remove = (id) => {
  return del(`/invite/delete/${id}`);
}
