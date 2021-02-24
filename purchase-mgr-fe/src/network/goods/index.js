import { post, get, del } from '../../helpers/request/index';

//添加供货信息的请求
export const add = (data) => {
  return post('/goods/add', data);
}

//获取list、查询的请求(供应商详情页)
export const supplierList = (data) => {
  return get('/goods/supplierList', data);
}

//删除供货信息的请求
export const deleteGoods = (id) => {
  return del(`/goods/deleteGoods/${id}`);
}

//修改供货信息的请求
export const update = (data) => {
  return post('/goods/update', data);
}

