import { post, get, del } from '../../helpers/request/index';

//添加供应商的请求
export const add = (data) => {
  return post('/supplier/add', data);
}

//获取list、查询的请求
export const list = (data) => {
  return get('/supplier/list', data);
}

//获取全部供应商list
export const listAll = () => {
  return get('/supplier/all');
}

//删除供应商的请求
export const deleteSupplier = (id) => {
  return del(`/supplier/deleteSupplier/${id}`);
}

//修改供应商信息的请求
export const update = (data) => {
  return post('/supplier/update', data);
}

//详情页面的请求
export const detail = (id) => {
  return get(`/supplier/detail/${id}`);
}
