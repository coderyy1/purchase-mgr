import { post, get, del } from '../../helpers/request/index';

//添加订单的请求
export const add = (data) => {
  return post('/order/add', data);
}

//获取list、查询的请求
export const list = (data) => {
  return get('/order/list', data);
}

//删除订单的请求
export const deleteOrder = (id) => {
  return del(`/order/deleteOrder/${id}`);
}

//修改订单信息的请求
export const update = (data) => {
  return post('/order/update', data);
}

//详情页面的请求
export const detail = (id) => {
  return get(`/order/detail/${id}`);
}

// 根据id获取list的请求
export const listById = (data) => {
  return get('/order/listById', data);
}