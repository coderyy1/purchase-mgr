import { post, get, del } from '../../helpers/request/index';

//添加库存货物的请求
export const add = (data) => {
  return post('/stock/add', data);
}

//获取list、查询的请求
export const list = (data) => {
  return get('/stock/list', data);
}

//出入库操作的请求
export const count = (data) => {
  return post('/stock/update/count', data);
}

//删除库存货物的请求
export const deleteStock = (id) => {
  return del(`/stock/deleteStock/${id}`);
}

//修改库存货物信息的请求
export const update = (data) => {
  return post('/stock/update', data);
}

//详情页面的请求
export const detail = (id) => {
  return get(`/stock/detail/${id}`);
}
